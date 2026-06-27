import uuid

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from app.models.conversation import Conversation
from app.models.message import Message, MessageRole


class ConversationCreateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    icon: str | None = Field(default=None, max_length=64)


class ConversationUpdateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=255)


class ConversationRead(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    id: uuid.UUID
    name: str
    icon: str
    created_at: int

    @classmethod
    def from_model(cls, conversation: Conversation) -> "ConversationRead":
        return cls(
            id=conversation.id,
            name=conversation.name,
            icon=conversation.icon,
            created_at=int(conversation.created_at.timestamp() * 1000),
        )


class CitationRead(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    document_id: uuid.UUID | None
    document_name: str
    page_number: int | None
    chunk_id: str
    similarity_score: float
    excerpt: str


class MessageRead(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    id: uuid.UUID
    role: MessageRole
    content: str
    created_at: int
    citations: list[CitationRead] = Field(default_factory=list)

    @classmethod
    def from_model(cls, message: Message, citations: list[CitationRead] | None = None) -> "MessageRead":
        return cls(
            id=message.id,
            role=message.role,
            content=message.content,
            created_at=int(message.created_at.timestamp() * 1000),
            citations=citations or [],
        )


class ConversationDetailRead(ConversationRead):
    messages: list[MessageRead] = Field(default_factory=list)


class SendMessageRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    content: str = Field(min_length=1)
    document_ids: list[uuid.UUID] | None = Field(
        default=None, description="Scope retrieval to these documents; omit/empty to search all owned documents"
    )
