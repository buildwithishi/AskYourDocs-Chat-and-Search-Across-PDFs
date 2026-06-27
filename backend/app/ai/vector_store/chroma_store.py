import asyncio
import uuid
from typing import Any

from app.ai.vector_store.base import VectorQueryResult, VectorRecord, VectorStore


class ChromaVectorStore(VectorStore):
    def __init__(self, persist_dir: str) -> None:
        import chromadb  # deferred: heavy import, loaded lazily

        self._client = chromadb.PersistentClient(path=persist_dir)

    @staticmethod
    def _collection_name(user_id: uuid.UUID) -> str:
        return f"user_{user_id.hex}"

    def _get_or_create_collection(self, user_id: uuid.UUID) -> Any:
        return self._client.get_or_create_collection(name=self._collection_name(user_id))

    async def add_chunks(self, *, user_id: uuid.UUID, records: list[VectorRecord]) -> None:
        if not records:
            return
        collection = await asyncio.to_thread(self._get_or_create_collection, user_id)
        await asyncio.to_thread(
            collection.add,
            ids=[record.vector_id for record in records],
            embeddings=[record.embedding for record in records],
            documents=[record.text for record in records],
            metadatas=[
                {
                    "document_id": record.document_id,
                    "chunk_index": record.chunk_index,
                    "page_number": record.page_number if record.page_number is not None else -1,
                }
                for record in records
            ],
        )

    async def delete_document(self, *, user_id: uuid.UUID, document_id: uuid.UUID) -> None:
        collection = await asyncio.to_thread(self._get_or_create_collection, user_id)
        await asyncio.to_thread(collection.delete, where={"document_id": str(document_id)})

    async def query(
        self,
        *,
        user_id: uuid.UUID,
        query_embedding: list[float],
        top_k: int,
        document_ids: list[uuid.UUID] | None = None,
    ) -> list[VectorQueryResult]:
        collection = await asyncio.to_thread(self._get_or_create_collection, user_id)
        where = {"document_id": {"$in": [str(doc_id) for doc_id in document_ids]}} if document_ids else None
        result = await asyncio.to_thread(
            collection.query, query_embeddings=[query_embedding], n_results=top_k, where=where
        )

        ids = result.get("ids") or [[]]
        documents = result.get("documents") or [[]]
        metadatas = result.get("metadatas") or [[]]
        distances = result.get("distances") or [[]]

        results: list[VectorQueryResult] = []
        for vector_id, text, metadata, distance in zip(ids[0], documents[0], metadatas[0], distances[0]):
            page_number = metadata.get("page_number")
            results.append(
                VectorQueryResult(
                    vector_id=vector_id,
                    document_id=str(metadata.get("document_id")),
                    chunk_index=int(metadata.get("chunk_index", 0)),
                    page_number=None if page_number is None or page_number < 0 else int(page_number),
                    text=text,
                    similarity_score=1.0 - float(distance),
                )
            )
        return results
