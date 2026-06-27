import uuid

from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document_chunk import DocumentChunk


class DocumentChunkRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def replace_for_document(
        self,
        *,
        document_id: uuid.UUID,
        chunks: list[tuple[int, int | None, int, str]],
    ) -> None:
        """Replace all chunk metadata for a document with `chunks` of
        (chunk_index, page_number, char_count, chroma_vector_id)."""
        await self.db.execute(delete(DocumentChunk).where(DocumentChunk.document_id == document_id))
        self.db.add_all(
            [
                DocumentChunk(
                    document_id=document_id,
                    chunk_index=chunk_index,
                    page_number=page_number,
                    char_count=char_count,
                    chroma_vector_id=chroma_vector_id,
                )
                for chunk_index, page_number, char_count, chroma_vector_id in chunks
            ]
        )
        await self.db.flush()

    async def delete_for_document(self, document_id: uuid.UUID) -> None:
        await self.db.execute(delete(DocumentChunk).where(DocumentChunk.document_id == document_id))
