import hashlib
import logging

from sqlalchemy.ext.asyncio import AsyncSession
from uuid6 import uuid7

from app.ai.vector_store.base import VectorStore
from app.core.config import get_settings
from app.core.exceptions import ValidationError
from app.ingestion.queue import IngestionQueue
from app.models.document import Document, DocumentExtension
from app.models.user import User
from app.repositories.document_chunk_repo import DocumentChunkRepository
from app.repositories.document_repo import DocumentRepository
from app.storage.base import StorageProvider
from app.utils.files import ALLOWED_EXTENSIONS, mime_type_for, resolve_extension

logger = logging.getLogger(__name__)


class DocumentService:
    def __init__(
        self,
        db: AsyncSession,
        storage: StorageProvider,
        ingestion_queue: IngestionQueue,
        vector_store: VectorStore,
    ) -> None:
        self.db = db
        self.storage = storage
        self.ingestion_queue = ingestion_queue
        self.vector_store = vector_store
        self.repo = DocumentRepository(db)
        self.chunk_repo = DocumentChunkRepository(db)

    async def upload(self, *, user: User, filename: str, content: bytes) -> Document:
        settings = get_settings()

        extension = resolve_extension(filename)
        if extension not in ALLOWED_EXTENSIONS:
            allowed = ", ".join(sorted(ALLOWED_EXTENSIONS))
            raise ValidationError(f"Unsupported file type '.{extension}'. Allowed types: {allowed}")

        size_bytes = len(content)
        max_bytes = settings.max_upload_mb * 1024 * 1024
        if size_bytes == 0:
            raise ValidationError("Uploaded file is empty")
        if size_bytes > max_bytes:
            raise ValidationError(f"File exceeds the {settings.max_upload_mb}MB upload limit")

        document_id = uuid7()
        storage_key = f"{user.id}/{document_id}.{extension}"
        checksum = hashlib.sha256(content).hexdigest()
        mime_type = mime_type_for(extension)

        await self.storage.save(storage_key, content, mime_type)
        logger.info(
            "document.uploaded document_id=%s user_id=%s extension=%s size_bytes=%d",
            document_id,
            user.id,
            extension,
            size_bytes,
        )

        document = await self.repo.create(
            id=document_id,
            user_id=user.id,
            name=filename,
            extension=DocumentExtension(extension),
            mime_type=mime_type,
            storage_key=storage_key,
            checksum_sha256=checksum,
            file_size_bytes=size_bytes,
        )
        await self.db.commit()

        await self.ingestion_queue.enqueue(document.id)
        logger.info("document.ingestion_enqueued document_id=%s", document.id)
        return document

    async def delete(self, document: Document) -> None:
        await self.storage.delete(document.storage_key)
        await self.vector_store.delete_document(user_id=document.user_id, document_id=document.id)
        await self.chunk_repo.delete_for_document(document.id)
        await self.repo.delete(document)
        await self.db.commit()
        logger.info("document.deleted document_id=%s", document.id)
