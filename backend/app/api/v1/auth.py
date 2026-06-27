import uuid

from fastapi import APIRouter, Cookie, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from jwt import PyJWTError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.exceptions import UnauthorizedError
from app.core.security import create_access_token, decode_token
from app.db.session import get_db
from app.repositories.user_repo import UserRepository
from app.schemas.auth import AuthResponse, RegisterRequest, TokenRefreshResponse
from app.schemas.user import UserRead
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()

REFRESH_COOKIE_NAME = "refresh_token"


def _set_refresh_cookie(response: Response, refresh_token: str) -> None:
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=settings.environment != "development",
        samesite="lax",
        max_age=settings.refresh_token_expire_days * 24 * 60 * 60,
        path="/api/v1/auth",
    )


@router.post("/register", response_model=AuthResponse)
async def register(
    payload: RegisterRequest, response: Response, db: AsyncSession = Depends(get_db)
) -> AuthResponse:
    service = AuthService(db)
    user = await service.register(name=payload.name, email=payload.email, password=payload.password)
    access_token, refresh_token = service.issue_tokens(user)
    _set_refresh_cookie(response, refresh_token)
    return AuthResponse(user=UserRead.model_validate(user), token=access_token)


@router.post("/login", response_model=AuthResponse)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
) -> AuthResponse:
    """OAuth2 password flow: the frontend's `email` field is sent as `username`."""
    service = AuthService(db)
    user = await service.authenticate(email=form_data.username, password=form_data.password)
    access_token, refresh_token = service.issue_tokens(user)
    _set_refresh_cookie(response, refresh_token)
    return AuthResponse(user=UserRead.model_validate(user), token=access_token)


@router.post("/refresh", response_model=TokenRefreshResponse)
async def refresh(
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE_NAME),
    db: AsyncSession = Depends(get_db),
) -> TokenRefreshResponse:
    if refresh_token is None:
        raise UnauthorizedError("Missing refresh token")

    try:
        payload = decode_token(refresh_token)
    except PyJWTError as exc:
        raise UnauthorizedError("Invalid or expired refresh token") from exc

    if payload.get("type") != "refresh":
        raise UnauthorizedError("Invalid token type")

    user = await UserRepository(db).get_by_id(uuid.UUID(payload["sub"]))
    if user is None:
        raise UnauthorizedError("User no longer exists")

    return TokenRefreshResponse(token=create_access_token(str(user.id)))
