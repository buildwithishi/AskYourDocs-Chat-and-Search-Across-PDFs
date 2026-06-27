import uuid

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from app.models.document import Document, DocumentExtension, DocumentStatus
from app.utils.time import humanize_relative


class DocumentRead(BaseModel):
    """Mirrors frontend/src/types/document.ts::AppDocument exactly (camelCase on the wire).

    Note: `status` additionally allows 'failed', one value beyond the current frontend
    union — an additive, non-breaking type change for the frontend to pick up.
    """

    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    id: uuid.UUID
    name: str
    extension: DocumentExtension
    size_mb: float
    date_added: str
    created_at: int
    status: DocumentStatus
    pages: int | None = None
    tag: str | None = None
    last_chatted: str | None = None
    starred: bool = False

    @classmethod
    def from_model(cls, document: Document) -> "DocumentRead":
        return cls(
            id=document.id,
            name=document.name,
            extension=document.extension,
            size_mb=round(document.file_size_bytes / (1024 * 1024), 2),
            date_added=document.created_at.strftime("%b %d, %Y"),
            created_at=int(document.created_at.timestamp() * 1000),
            status=document.status,
            pages=document.pages,
            tag=document.tag,
            last_chatted=humanize_relative(document.last_chatted_at) if document.last_chatted_at else None,
            starred=document.starred,
        )


class DocumentUpdateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    tag: str | None = None
    starred: bool | None = None


class DocumentStatusRead(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    status: DocumentStatus
    pages: int | None = None
    processing_error: str | None = None
