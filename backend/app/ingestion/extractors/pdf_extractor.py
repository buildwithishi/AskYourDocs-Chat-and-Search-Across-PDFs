from app.ingestion.extractors.base import ExtractedDocument, ExtractedPage, TextExtractor


class PdfExtractor(TextExtractor):
    def extract(self, content: bytes) -> ExtractedDocument:
        import fitz  # PyMuPDF — deferred: heavy import, loaded lazily

        pdf = fitz.open(stream=content, filetype="pdf")
        try:
            pages = [ExtractedPage(page_number=i + 1, text=page.get_text()) for i, page in enumerate(pdf)]
        finally:
            pdf.close()
        return ExtractedDocument(pages=pages, page_count=len(pages))
