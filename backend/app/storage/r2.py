from app.core.config import get_settings
from app.storage.base import StorageProvider


class R2StorageProvider(StorageProvider):
    """Cloudflare R2 (S3-compatible) storage — scaffold only, not yet implemented.

    Implementation plan: use `boto3` with an S3 client pointed at
    `https://<r2_account_id>.r2.cloudflarestorage.com`, bucket `r2_bucket_name`,
    credentials from `r2_access_key_id` / `r2_secret_access_key`. `save`/`read`/`delete`
    map directly to `put_object`/`get_object`/`delete_object` keyed the same way as
    LocalStorageProvider, so swapping STORAGE_BACKEND requires no caller changes.
    """

    def __init__(self) -> None:
        settings = get_settings()
        self._account_id = settings.r2_account_id
        self._access_key_id = settings.r2_access_key_id
        self._secret_access_key = settings.r2_secret_access_key
        self._bucket_name = settings.r2_bucket_name

    async def save(self, key: str, data: bytes, content_type: str) -> str:
        raise NotImplementedError("R2StorageProvider.save is not implemented yet")

    async def read(self, key: str) -> bytes:
        raise NotImplementedError("R2StorageProvider.read is not implemented yet")

    async def delete(self, key: str) -> None:
        raise NotImplementedError("R2StorageProvider.delete is not implemented yet")
