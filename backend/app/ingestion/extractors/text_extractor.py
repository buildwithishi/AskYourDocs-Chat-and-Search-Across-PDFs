from app.ingestion.extractors.base import ExtractedDocument, ExtractedPage, TextExtractor


class PlainTextExtractor(TextExtractor):
    """Handles both .txt and .md — markdown syntax is left intact for the LLM to read as-is."""

    def extract(self, content: bytes) -> ExtractedDocument:
        text = content.decode("utf-8", errors="replace")
        return ExtractedDocument(pages=[ExtractedPage(page_number=None, text=text)], page_count=None)
