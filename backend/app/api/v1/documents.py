import uuid

from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.ai.vector_store.base import VectorStore
from app.ai.vector_store.factory import get_vector_store
from app.api.deps import get_current_user, get_ingestion_queue
from app.core.exceptions import NotFoundError, ValidationError
from app.db.session import get_db
from app.ingestion.queue import IngestionQueue
from app.models.user import User
from app.repositories.document_repo import DocumentRepository
from app.schemas.document import DocumentRead, DocumentStatusRead, DocumentUpdateRequest
from app.services.document_service import DocumentService
from app.storage.base import StorageProvider
from app.storage.factory import get_storage_provider

router = APIRouter(prefix="/documents", tags=["documents"])


@router.post("", response_model=DocumentRead, status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    storage: StorageProvider = Depends(get_storage_provider),
    vector_store: VectorStore = Depends(get_vector_store),
    ingestion_queue: IngestionQueue = Depends(get_ingestion_queue),
) -> DocumentRead:
    if not file.filename:
        raise ValidationError("Uploaded file is missing a filename")

    content = await file.read()
    service = DocumentService(db, storage, ingestion_queue, vector_store)
    document = await service.upload(user=current_user, filename=file.filename, content=content)
    return DocumentRead.from_model(document)


@router.get("", response_model=list[DocumentRead])
async def list_documents(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[DocumentRead]:
    documents = await DocumentRepository(db).list_for_user(current_user.id)
    return [DocumentRead.from_model(document) for document in documents]


@router.get("/{document_id}", response_model=DocumentRead)
async def get_document(
    document_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> DocumentRead:
    document = await DocumentRepository(db).get_for_user(document_id, current_user.id)
    if document is None:
        raise NotFoundError("Document not found")
    return DocumentRead.from_model(document)


@router.get("/{document_id}/status", response_model=DocumentStatusRead)
async def get_document_status(
    document_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> DocumentStatusRead:
    document = await DocumentRepository(db).get_for_user(document_id, current_user.id)
    if document is None:
        raise NotFoundError("Document not found")
    return DocumentStatusRead(
        status=document.status, pages=document.pages, processing_error=document.processing_error
    )


@router.patch("/{document_id}", response_model=DocumentRead)
async def update_document(
    document_id: uuid.UUID,
    payload: DocumentUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> DocumentRead:
    repo = DocumentRepository(db)
    document = await repo.get_for_user(document_id, current_user.id)
    if document is None:
        raise NotFoundError("Document not found")

    if payload.name is not None:
        document.name = payload.name
    if payload.tag is not None:
        document.tag = payload.tag
    if payload.starred is not None:
        document.starred = payload.starred

    await db.commit()
    await db.refresh(document)
    return DocumentRead.from_model(document)


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    storage: StorageProvider = Depends(get_storage_provider),
    vector_store: VectorStore = Depends(get_vector_store),
    ingestion_queue: IngestionQueue = Depends(get_ingestion_queue),
) -> None:
    document = await DocumentRepository(db).get_for_user(document_id, current_user.id)
    if document is None:
        raise NotFoundError("Document not found")

    service = DocumentService(db, storage, ingestion_queue, vector_store)
    await service.delete(document)
