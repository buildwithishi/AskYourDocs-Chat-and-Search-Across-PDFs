import httpx
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.vector_store.factory import get_vector_store
from app.core.config import get_settings
from app.db.session import get_db

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/db")
async def health_db(db: AsyncSession = Depends(get_db)) -> dict[str, str]:
    try:
        await db.execute(text("SELECT 1"))
    except SQLAlchemyError:
        return {"status": "error"}
    return {"status": "ok"}


@router.get("/vector-store")
async def health_vector_store() -> dict[str, str]:
    try:
        get_vector_store()
    except Exception:
        return {"status": "error"}
    return {"status": "ok"}


@router.get("/llm")
async def health_llm() -> dict[str, str]:
    settings = get_settings()
    provider = settings.llm_provider.lower()

    if provider == "ollama":
        try:
            async with httpx.AsyncClient(timeout=3) as client:
                response = await client.get(f"{settings.ollama_base_url}/api/version")
                response.raise_for_status()
        except httpx.HTTPError:
            return {"status": "error"}
        return {"status": "ok"}

    api_key = {
        "openai": settings.openai_api_key,
        "groq": settings.groq_api_key,
        "openrouter": settings.openrouter_api_key,
    }.get(provider)
    if api_key is None:
        return {"status": "not_configured" if provider in ("openai", "groq", "openrouter") else "error"}
    return {"status": "ok"}
