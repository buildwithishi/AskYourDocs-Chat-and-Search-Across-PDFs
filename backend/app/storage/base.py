from abc import ABC, abstractmethod


class StorageProvider(ABC):
    """Swappable file storage backend (local filesystem in dev, Cloudflare R2 in production)."""

    @abstractmethod
    async def save(self, key: str, data: bytes, content_type: str) -> str:
        """Persist `data` under `key`, returning the storage key/path it was saved as."""

    @abstractmethod
    async def read(self, key: str) -> bytes:
        """Read the full contents stored under `key`."""

    @abstractmethod
    async def delete(self, key: str) -> None:
        """Delete the object stored under `key`, if it exists."""
