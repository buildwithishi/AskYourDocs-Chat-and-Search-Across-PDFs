import asyncio
import logging
import time
import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.embeddings import EmbeddingProvider
from app.ai.vector_store.base import VectorStore
from app.core.config import get_settings
from app.repositories.document_repo import DocumentRepository

logger = logging.getLogger(__name__)


@dataclass
class RetrievedChunk:
    document_id: uuid.UUID
    document_name: str
    chunk_id: str
    chunk_index: int
    page_number: int | None
    text: str
    similarity_score: float


class RetrievalService(ABC):
    @abstractmethod
    async def retrieve(
        self,
        *,
        user_id: uuid.UUID,
        query: str,
        document_ids: list[uuid.UUID] | None = None,
        top_k: int | None = None,
        similarity_threshold: float | None = None,
    ) -> list[RetrievedChunk]:
        """Retrieve relevant chunks for `query`, scoped to documents owned by `user_id`.

        `document_ids`, if given, further restricts the search to that subset
        (any ids not owned by the user are silently dropped — never trust caller-supplied
        ownership). Returns [] if the user owns none of the requested documents."""


class VectorRetrievalService(RetrievalService):
    def __init__(
        self,
        db: AsyncSession,
        embedding_provider: EmbeddingProvider,
        vector_store: VectorStore,
    ) -> None:
        self.db = db
        self.embedding_provider = embedding_provider
        self.vector_store = vector_store
        self.document_repo = DocumentRepository(db)

    async def retrieve(
        self,
        *,
        user_id: uuid.UUID,
        query: str,
        document_ids: list[uuid.UUID] | None = None,
        top_k: int | None = None,
        similarity_threshold: float | None = None,
    ) -> list[RetrievedChunk]:
        settings = get_settings()
        top_k = top_k or settings.retrieval_top_k
        similarity_threshold = (
            similarity_threshold if similarity_threshold is not None else settings.retrieval_similarity_threshold
        )

        scoped_document_ids: list[uuid.UUID] | None = None
        if document_ids:
            owned = await self.document_repo.list_by_ids_for_user(document_ids, user_id)
            scoped_document_ids = [doc.id for doc in owned]
            if not scoped_document_ids:
                logger.info("retrieval.no_owned_documents user_id=%s requested=%d", user_id, len(document_ids))
                return []

        start = time.monotonic()
        embedding = await asyncio.to_thread(self.embedding_provider.embed, [query])
        results = await self.vector_store.query(
            user_id=user_id,
            query_embedding=embedding[0],
            top_k=top_k,
            document_ids=scoped_document_ids,
        )
        duration_ms = (time.monotonic() - start) * 1000

        filtered = [r for r in results if r.similarity_score >= similarity_threshold]
        logger.info(
            "retrieval.completed user_id=%s top_k=%d threshold=%.3f matches=%d/%d duration_ms=%.1f",
            user_id,
            top_k,
            similarity_threshold,
            len(filtered),
            len(results),
            duration_ms,
        )
        if not filtered:
            return []

        document_names = {
            doc.id: doc.name
            for doc in await self.document_repo.list_by_ids_for_user(
                list({uuid.UUID(r.document_id) for r in filtered}), user_id
            )
        }

        return [
            RetrievedChunk(
                document_id=uuid.UUID(r.document_id),
                document_name=document_names.get(uuid.UUID(r.document_id), "Unknown document"),
                chunk_id=r.vector_id,
                chunk_index=r.chunk_index,
                page_number=r.page_number,
                text=r.text,
                similarity_score=r.similarity_score,
            )
            for r in filtered
            if uuid.UUID(r.document_id) in document_names
        ]
