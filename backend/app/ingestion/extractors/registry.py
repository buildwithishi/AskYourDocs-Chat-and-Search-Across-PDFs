from app.ingestion.extractors.base import TextExtractor
from app.ingestion.extractors.docx_extractor import DocxExtractor
from app.ingestion.extractors.pdf_extractor import PdfExtractor
from app.ingestion.extractors.text_extractor import PlainTextExtractor
from app.models.document import DocumentExtension

_EXTRACTORS: dict[DocumentExtension, TextExtractor] = {
    DocumentExtension.pdf: PdfExtractor(),
    DocumentExtension.docx: DocxExtractor(),
    DocumentExtension.txt: PlainTextExtractor(),
    DocumentExtension.md: PlainTextExtractor(),
}


def get_extractor(extension: DocumentExtension) -> TextExtractor:
    return _EXTRACTORS[extension]
