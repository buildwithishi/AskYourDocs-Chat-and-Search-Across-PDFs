from functools import lru_cache

from app.core.config import get_settings
from app.storage.base import StorageProvider
from app.storage.local import LocalStorageProvider
from app.storage.r2 import R2StorageProvider


@lru_cache
def get_storage_provider() -> StorageProvider:
    settings = get_settings()
    if settings.storage_backend == "r2":
        return R2StorageProvider()
    return LocalStorageProvider(settings.upload_dir)
