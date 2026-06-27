from abc import ABC, abstractmethod
from collections.abc import AsyncIterator
from dataclasses import dataclass
from typing import Literal


@dataclass
class LLMMessage:
    role: Literal["system", "user", "assistant"]
    content: str


class LLMProvider(ABC):
    """Swappable chat-completion backend (Ollama, or any OpenAI-compatible API)."""

    @abstractmethod
    def stream_chat(self, messages: list[LLMMessage]) -> AsyncIterator[str]:
        """Yield incremental text deltas for a chat completion."""
