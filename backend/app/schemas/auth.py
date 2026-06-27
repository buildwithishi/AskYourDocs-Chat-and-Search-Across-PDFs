from pydantic import BaseModel, EmailStr, Field

from app.schemas.user import UserRead


class RegisterRequest(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class AuthResponse(BaseModel):
    """Mirrors frontend/src/types/user.ts::AuthSession exactly."""

    user: UserRead
    token: str


class TokenRefreshResponse(BaseModel):
    token: str
