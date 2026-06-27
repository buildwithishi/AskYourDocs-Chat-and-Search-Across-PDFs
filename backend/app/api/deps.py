import uuid

from fastapi import BackgroundTasks, Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.embeddings import get_embedding_provider
from app.ai.llm.base import LLMProvider
from app.ai.llm.factory import get_llm_provider
from app.ai.prompting import PromptBuilder, RagPromptBuilder
from app.ai.vector_store.factory import get_vector_store
from app.core.exceptions import UnauthorizedError
from app.core.security import decode_token
from app.db.session import get_db
from app.ingestion.queue import BackgroundTaskIngestionQueue, IngestionQueue
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.services.chat_service import ChatService, RagChatService
from app.services.retrieval_service import RetrievalService, VectorRetrievalService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_ingestion_queue(background_tasks: BackgroundTasks) -> IngestionQueue:
    """The route layer only ever depends on this factory + the `IngestionQueue`
    interface — swapping BackgroundTasks for Celery later means changing this
    function's body only, not any route."""
    return BackgroundTaskIngestionQueue(background_tasks)


def get_retrieval_service(db: AsyncSession = Depends(get_db)) -> RetrievalService:
    return VectorRetrievalService(db, get_embedding_provider(), get_vector_store())


def get_prompt_builder() -> PromptBuilder:
    return RagPromptBuilder()


def get_chat_llm_provider() -> LLMProvider:
    return get_llm_provider()


def get_chat_service(
    db: AsyncSession = Depends(get_db),
    retrieval_service: RetrievalService = Depends(get_retrieval_service),
    prompt_builder: PromptBuilder = Depends(get_prompt_builder),
    llm_provider: LLMProvider = Depends(get_chat_llm_provider),
) -> ChatService:
    return RagChatService(db, retrieval_service, prompt_builder, llm_provider)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    try:
        payload = decode_token(token)
    except PyJWTError as exc:
        raise UnauthorizedError("Invalid or expired token") from exc

    if payload.get("type") != "access":
        raise UnauthorizedError("Invalid token type")

    user = await UserRepository(db).get_by_id(uuid.UUID(payload["sub"]))
    if user is None:
        raise UnauthorizedError("User no longer exists")
    return user
