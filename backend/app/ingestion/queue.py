import uuid
from abc import ABC, abstractmethod

from fastapi import BackgroundTasks

from app.ingestion.pipeline import run_ingestion_job


class IngestionQueue(ABC):
    @abstractmethod
    async def enqueue(self, document_id: uuid.UUID) -> None: ...


class BackgroundTaskIngestionQueue(IngestionQueue):
    """FastAPI BackgroundTasks today; swap the implementation returned by
    `app.api.deps.get_ingestion_queue` for a Celery/RQ-backed one later — the
    API routes only ever call `enqueue`, so they never need to change."""

    def __init__(self, background_tasks: BackgroundTasks) -> None:
        self._background_tasks = background_tasks

    async def enqueue(self, document_id: uuid.UUID) -> None:
        self._background_tasks.add_task(run_ingestion_job, document_id)
