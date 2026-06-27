import asyncio
import logging
import uuid
from datetime import datetime, timezone

from app.ai.embeddings import get_embedding_provider
from app.ai.vector_store.base import VectorRecord
from app.ai.vector_store.factory import get_vector_store
from app.db.session import AsyncSessionLocal
from app.ingestion.chunking import chunk_extracted_document
from app.ingestion.extractors.registry import get_extractor
from app.models.document import DocumentStatus
from app.repositories.document_chunk_repo import DocumentChunkRepository
from app.repositories.document_repo import DocumentRepository
from app.storage.factory import get_storage_provider

logger = logging.getLogger(__name__)


async def run_ingestion_job(document_id: uuid.UUID) -> None:
    """The actual ingestion work, independent of how it was triggered (BackgroundTasks
    today, a Celery/RQ worker later — this function's signature is the stable contract)."""

    async with AsyncSessionLocal() as db:
        repo = DocumentRepository(db)
        document = await repo.get_by_id(document_id)
        if document is None:
            logger.error("ingestion.document_not_found document_id=%s", document_id)
            return

        document.status = DocumentStatus.indexing
        document.processing_started_at = datetime.now(timezone.utc)
        await db.commit()
        logger.info("ingestion.started document_id=%s extension=%s", document_id, document.extension.value)

        try:
            storage = get_storage_provider()
            content = await storage.read(document.storage_key)

            extractor = get_extractor(document.extension)
            extracted = await asyncio.to_thread(extractor.extract, content)

            chunks = chunk_extracted_document(extracted)
            if not chunks:
                raise ValueError("No extractable text found in document")

            # get_embedding_provider() may load/download the model on first call (slow,
            # network-bound) — never call it inline on the event loop thread.
            embedding_provider = await asyncio.to_thread(get_embedding_provider)
            texts = [chunk.text for chunk in chunks]
            embeddings = await asyncio.to_thread(embedding_provider.embed, texts)

            vector_records = [
                VectorRecord(
                    vector_id=f"{document_id}-{chunk.chunk_index}",
                    document_id=str(document_id),
                    chunk_index=chunk.chunk_index,
                    page_number=chunk.page_number,
                    text=chunk.text,
                    embedding=embedding,
                )
                for chunk, embedding in zip(chunks, embeddings)
            ]

            vector_store = get_vector_store()
            await vector_store.add_chunks(user_id=document.user_id, records=vector_records)

            chunk_repo = DocumentChunkRepository(db)
            await chunk_repo.replace_for_document(
                document_id=document_id,
                chunks=[
                    (chunk.chunk_index, chunk.page_number, len(chunk.text), record.vector_id)
                    for chunk, record in zip(chunks, vector_records)
                ],
            )

            document.status = DocumentStatus.ready
            document.pages = extracted.page_count
            document.embedding_model = embedding_provider.model_name
            document.processing_completed_at = datetime.now(timezone.utc)
            document.processing_error = None
            await db.commit()
            logger.info("ingestion.completed document_id=%s chunks=%d", document_id, len(chunks))

        except Exception as exc:  # noqa: BLE001 — any extraction/embedding/storage failure must land in `failed`
            logger.exception("ingestion.failed document_id=%s", document_id)
            document.status = DocumentStatus.failed
            document.processing_error = str(exc)
            document.processing_completed_at = datetime.now(timezone.utc)
            await db.commit()
