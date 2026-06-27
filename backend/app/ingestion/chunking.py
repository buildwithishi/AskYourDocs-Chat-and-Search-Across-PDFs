from dataclasses import dataclass

from app.core.config import get_settings
from app.ingestion.extractors.base import ExtractedDocument


@dataclass
class TextChunk:
    chunk_index: int
    page_number: int | None
    text: str


def chunk_extracted_document(
    document: ExtractedDocument,
    *,
    chunk_size: int | None = None,
    chunk_overlap: int | None = None,
) -> list[TextChunk]:
    from langchain_text_splitters import RecursiveCharacterTextSplitter

    settings = get_settings()
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size or settings.chunk_size,
        chunk_overlap=chunk_overlap or settings.chunk_overlap,
    )

    chunks: list[TextChunk] = []
    index = 0
    for page in document.pages:
        if not page.text.strip():
            continue
        for piece in splitter.split_text(page.text):
            chunks.append(TextChunk(chunk_index=index, page_number=page.page_number, text=piece))
            index += 1
    return chunks
