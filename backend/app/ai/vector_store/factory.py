from functools import lru_cache

from app.ai.vector_store.base import VectorStore
from app.ai.vector_store.chroma_store import ChromaVectorStore
from app.core.config import get_settings


@lru_cache
def get_vector_store() -> VectorStore:
    settings = get_settings()
    return ChromaVectorStore(settings.chroma_persist_dir)
