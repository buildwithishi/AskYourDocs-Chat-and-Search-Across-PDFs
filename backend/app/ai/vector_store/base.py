import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class VectorRecord:
    vector_id: str
    document_id: str
    chunk_index: int
    page_number: int | None
    text: str
    embedding: list[float]


@dataclass
class VectorQueryResult:
    vector_id: str
    document_id: str
    chunk_index: int
    page_number: int | None
    text: str
    similarity_score: float


class VectorStore(ABC):
    """Swappable vector index (ChromaDB today). One isolated collection per user."""

    @abstractmethod
    async def add_chunks(self, *, user_id: uuid.UUID, records: list[VectorRecord]) -> None: ...

    @abstractmethod
    async def delete_document(self, *, user_id: uuid.UUID, document_id: uuid.UUID) -> None: ...

    @abstractmethod
    async def query(
        self,
        *,
        user_id: uuid.UUID,
        query_embedding: list[float],
        top_k: int,
        document_ids: list[uuid.UUID] | None = None,
    ) -> list[VectorQueryResult]:
        """Search the user's collection. If `document_ids` is given, restrict the
        search to those documents (used for single/multi-document scoped chat)."""
