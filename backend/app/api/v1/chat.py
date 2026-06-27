import json
import logging
import uuid

from fastapi import APIRouter, Depends, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_chat_service, get_current_user
from app.core.exceptions import AppError, NotFoundError
from app.db.session import get_db
from app.models.conversation import Conversation
from app.models.user import User
from app.repositories.citation_repo import CitationRepository
from app.repositories.conversation_repo import ConversationRepository
from app.repositories.message_repo import MessageRepository
from app.schemas.chat import (
    CitationRead,
    ConversationCreateRequest,
    ConversationDetailRead,
    ConversationRead,
    ConversationUpdateRequest,
    MessageRead,
    SendMessageRequest,
)
from app.services.chat_service import ChatService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/conversations", tags=["chat"])


@router.post("", response_model=ConversationRead, status_code=status.HTTP_201_CREATED)
async def create_conversation(
    payload: ConversationCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ConversationRead:
    conversation = await ConversationRepository(db).create(
        user_id=current_user.id, name=payload.name, icon=payload.icon
    )
    await db.commit()
    return ConversationRead.from_model(conversation)


@router.get("", response_model=list[ConversationRead])
async def list_conversations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[ConversationRead]:
    conversations = await ConversationRepository(db).list_for_user(current_user.id)
    return [ConversationRead.from_model(c) for c in conversations]


@router.get("/{conversation_id}", response_model=ConversationDetailRead)
async def get_conversation(
    conversation_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ConversationDetailRead:
    conversation = await ConversationRepository(db).get_for_user(conversation_id, current_user.id)
    if conversation is None:
        raise NotFoundError("Conversation not found")

    messages = await MessageRepository(db).list_for_conversation(conversation_id)
    citations_by_message = await CitationRepository(db).list_for_messages([m.id for m in messages])

    message_reads = [
        MessageRead.from_model(
            message,
            [
                CitationRead(
                    document_id=c.document_id,
                    document_name=c.document_name,
                    page_number=c.page_number,
                    chunk_id=c.chunk_id,
                    similarity_score=c.similarity_score,
                    excerpt=c.excerpt,
                )
                for c in citations_by_message.get(message.id, [])
            ],
        )
        for message in messages
    ]

    base = ConversationRead.from_model(conversation)
    return ConversationDetailRead(**base.model_dump(), messages=message_reads)


@router.patch("/{conversation_id}", response_model=ConversationRead)
async def rename_conversation(
    conversation_id: uuid.UUID,
    payload: ConversationUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ConversationRead:
    repo = ConversationRepository(db)
    conversation = await repo.get_for_user(conversation_id, current_user.id)
    if conversation is None:
        raise NotFoundError("Conversation not found")

    conversation.name = payload.name
    await db.commit()
    await db.refresh(conversation)
    return ConversationRead.from_model(conversation)


@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(
    conversation_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    repo = ConversationRepository(db)
    conversation = await repo.get_for_user(conversation_id, current_user.id)
    if conversation is None:
        raise NotFoundError("Conversation not found")

    await repo.delete(conversation)
    await db.commit()


async def _load_conversation_or_404(conversation_id: uuid.UUID, current_user: User, db: AsyncSession) -> Conversation:
    conversation = await ConversationRepository(db).get_for_user(conversation_id, current_user.id)
    if conversation is None:
        raise NotFoundError("Conversation not found")
    return conversation


@router.post("/{conversation_id}/messages", response_model=MessageRead)
async def send_message(
    conversation_id: uuid.UUID,
    payload: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    chat_service: ChatService = Depends(get_chat_service),
) -> MessageRead:
    conversation = await _load_conversation_or_404(conversation_id, current_user, db)

    citations: list[CitationRead] = []
    message_id: uuid.UUID | None = None
    async for event in chat_service.generate_response(
        user=current_user, conversation=conversation, content=payload.content, document_ids=payload.document_ids
    ):
        if event.type == "error":
            raise AppError(str(event.data), status_code=502)
        if event.type == "citations":
            citations = event.data
        if event.type == "done":
            message_id = uuid.UUID(event.data["message_id"])

    if message_id is None:
        raise AppError("The assistant did not return a response", status_code=502)

    message = await MessageRepository(db).get_by_id(message_id)
    if message is None:
        raise AppError("Assistant message could not be loaded", status_code=502)
    return MessageRead.from_model(message, citations)


@router.post("/{conversation_id}/messages/stream")
async def stream_message(
    conversation_id: uuid.UUID,
    payload: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    chat_service: ChatService = Depends(get_chat_service),
) -> StreamingResponse:
    conversation = await _load_conversation_or_404(conversation_id, current_user, db)

    async def event_stream():
        try:
            async for event in chat_service.generate_response(
                user=current_user,
                conversation=conversation,
                content=payload.content,
                document_ids=payload.document_ids,
            ):
                if event.type == "token":
                    data = json.dumps({"content": event.data})
                elif event.type == "citations":
                    data = json.dumps([c.model_dump(by_alias=True, mode="json") for c in event.data])
                elif event.type == "done":
                    data = json.dumps(event.data)
                else:
                    data = json.dumps({"message": str(event.data)})
                yield f"event: {event.type}\ndata: {data}\n\n"
        except Exception:
            logger.exception("chat.stream_unhandled_error conversation_id=%s", conversation_id)
            yield f"event: error\ndata: {json.dumps({'message': 'Unexpected server error'})}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
