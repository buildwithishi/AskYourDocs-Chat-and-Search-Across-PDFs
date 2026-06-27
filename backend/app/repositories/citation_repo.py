import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.message_citation import MessageCitation


class CitationRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create_many(
        self,
        *,
        message_id: uuid.UUID,
        citations: list[dict],
    ) -> list[MessageCitation]:
        rows = [MessageCitation(message_id=message_id, **citation) for citation in citations]
        self.db.add_all(rows)
        await self.db.flush()
        return rows

    async def list_for_messages(self, message_ids: list[uuid.UUID]) -> dict[uuid.UUID, list[MessageCitation]]:
        if not message_ids:
            return {}
        result = await self.db.execute(
            select(MessageCitation).where(MessageCitation.message_id.in_(message_ids))
        )
        grouped: dict[uuid.UUID, list[MessageCitation]] = {message_id: [] for message_id in message_ids}
        for citation in result.scalars().all():
            grouped[citation.message_id].append(citation)
        return grouped
