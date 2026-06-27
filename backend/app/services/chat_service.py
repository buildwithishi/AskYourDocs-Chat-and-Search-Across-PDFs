import logging
import time
import uuid
from abc import ABC, abstractmethod
from collections.abc import AsyncIterator
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Literal

from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.llm.base import LLMProvider
from app.ai.prompting import PromptBuilder
from app.core.config import get_settings
from app.models.conversation import Conversation
from app.models.message import MessageRole
from app.models.user import User
from app.repositories.citation_repo import CitationRepository
from app.repositories.message_repo import MessageRepository
from app.schemas.chat import CitationRead
from app.services.retrieval_service import RetrievalService

logger = logging.getLogger(__name__)


@dataclass
class ChatStreamEvent:
    type: Literal["token", "citations", "done", "error"]
    data: Any


class ChatService(ABC):
    @abstractmethod
    def generate_response(
        self,
        *,
        user: User,
        conversation: Conversation,
        content: str,
        document_ids: list[uuid.UUID] | None,
    ) -> AsyncIterator[ChatStreamEvent]:
        """Persist the user message, retrieve context, stream the assistant reply, and
        persist it with citations. Yields `token` events as they arrive, then a single
        `citations` event, then `done` — or a single `error` event on failure."""


class RagChatService(ChatService):
    def __init__(
        self,
        db: AsyncSession,
        retrieval_service: RetrievalService,
        prompt_builder: PromptBuilder,
        llm_provider: LLMProvider,
    ) -> None:
        self.db = db
        self.retrieval_service = retrieval_service
        self.prompt_builder = prompt_builder
        self.llm_provider = llm_provider
        self.message_repo = MessageRepository(db)
        self.citation_repo = CitationRepository(db)

    async def generate_response(
        self,
        *,
        user: User,
        conversation: Conversation,
        content: str,
        document_ids: list[uuid.UUID] | None,
    ) -> AsyncIterator[ChatStreamEvent]:
        settings = get_settings()

        history = await self.message_repo.list_recent(conversation.id, settings.conversation_history_length)

        await self.message_repo.create(conversation_id=conversation.id, role=MessageRole.user, content=content)
        conversation.updated_at = datetime.now(timezone.utc)
        await self.db.commit()

        retrieval_start = time.monotonic()
        try:
            retrieved_chunks = await self.retrieval_service.retrieve(
                user_id=user.id, query=content, document_ids=document_ids
            )
        except Exception:
            logger.exception("chat.retrieval_failed conversation_id=%s", conversation.id)
            yield ChatStreamEvent("error", "Failed to search your documents. Please try again.")
            return
        retrieval_duration_ms = (time.monotonic() - retrieval_start) * 1000
        logger.info(
            "chat.retrieval_timing conversation_id=%s chunks=%d duration_ms=%.1f",
            conversation.id,
            len(retrieved_chunks),
            retrieval_duration_ms,
        )

        prompt_messages = self.prompt_builder.build(question=content, retrieved_chunks=retrieved_chunks, history=history)

        full_text = ""
        generation_start = time.monotonic()
        try:
            async for delta in self.llm_provider.stream_chat(prompt_messages):
                full_text += delta
                yield ChatStreamEvent("token", delta)
        except Exception as exc:
            logger.exception("chat.generation_failed conversation_id=%s", conversation.id)
            yield ChatStreamEvent("error", str(exc))
            return
        generation_duration_ms = (time.monotonic() - generation_start) * 1000
        logger.info(
            "chat.generation_timing conversation_id=%s duration_ms=%.1f chars=%d",
            conversation.id,
            generation_duration_ms,
            len(full_text),
        )

        if not full_text.strip():
            yield ChatStreamEvent("error", "The model returned an empty response.")
            return

        assistant_message = await self.message_repo.create(
            conversation_id=conversation.id, role=MessageRole.assistant, content=full_text
        )

        citation_rows = await self.citation_repo.create_many(
            message_id=assistant_message.id,
            citations=[
                {
                    "document_id": chunk.document_id,
                    "document_name": chunk.document_name,
                    "page_number": chunk.page_number,
                    "chunk_id": chunk.chunk_id,
                    "similarity_score": chunk.similarity_score,
                    "excerpt": chunk.text,
                }
                for chunk in retrieved_chunks
            ],
        )

        conversation.updated_at = datetime.now(timezone.utc)
        await self.db.commit()

        citations = [
            CitationRead(
                document_id=row.document_id,
                document_name=row.document_name,
                page_number=row.page_number,
                chunk_id=row.chunk_id,
                similarity_score=row.similarity_score,
                excerpt=row.excerpt,
            )
            for row in citation_rows
        ]
        yield ChatStreamEvent("citations", citations)
        yield ChatStreamEvent("done", {"message_id": str(assistant_message.id)})
