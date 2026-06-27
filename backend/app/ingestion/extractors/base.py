from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class ExtractedPage:
    page_number: int | None
    text: str


@dataclass
class ExtractedDocument:
    pages: list[ExtractedPage]
    page_count: int | None


class TextExtractor(ABC):
    @abstractmethod
    def extract(self, content: bytes) -> ExtractedDocument: ...
