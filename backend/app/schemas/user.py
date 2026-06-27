import uuid

from pydantic import BaseModel, ConfigDict, EmailStr
from pydantic.alias_generators import to_camel

from app.models.user import UserPlan


class UserRead(BaseModel):
    """Mirrors frontend/src/types/user.ts::User exactly (camelCase on the wire)."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True, alias_generator=to_camel)

    id: uuid.UUID
    name: str
    email: EmailStr
    avatar_url: str | None = None
    plan: UserPlan
