import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document import Document, DocumentExtension, DocumentStatus


class DocumentRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, document_id: uuid.UUID) -> Document | None:
        result = await self.db.execute(select(Document).where(Document.id == document_id))
        return result.scalar_one_or_none()

    async def get_for_user(self, document_id: uuid.UUID, user_id: uuid.UUID) -> Document | None:
        result = await self.db.execute(
            select(Document).where(Document.id == document_id, Document.user_id == user_id)
        )
        return result.scalar_one_or_none()

    async def list_for_user(self, user_id: uuid.UUID) -> list[Document]:
        result = await self.db.execute(
            select(Document).where(Document.user_id == user_id).order_by(Document.created_at.desc())
        )
        return list(result.scalars().all())

    async def list_by_ids_for_user(self, document_ids: list[uuid.UUID], user_id: uuid.UUID) -> list[Document]:
        """Returns only the subset of `document_ids` actually owned by `user_id`."""
        if not document_ids:
            return []
        result = await self.db.execute(
            select(Document).where(Document.id.in_(document_ids), Document.user_id == user_id)
        )
        return list(result.scalars().all())

    async def create(
        self,
        *,
        id: uuid.UUID,
        user_id: uuid.UUID,
        name: str,
        extension: DocumentExtension,
        mime_type: str,
        storage_key: str,
        checksum_sha256: str,
        file_size_bytes: int,
    ) -> Document:
        document = Document(
            id=id,
            user_id=user_id,
            name=name,
            extension=extension,
            mime_type=mime_type,
            storage_key=storage_key,
            checksum_sha256=checksum_sha256,
            file_size_bytes=file_size_bytes,
            status=DocumentStatus.processing,
        )
        self.db.add(document)
        await self.db.flush()
        await self.db.refresh(document)
        return document

    async def delete(self, document: Document) -> None:
        await self.db.delete(document)
