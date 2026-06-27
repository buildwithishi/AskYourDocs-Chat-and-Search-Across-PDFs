import json
import logging
from collections.abc import AsyncIterator

import httpx

from app.ai.llm.base import LLMMessage, LLMProvider

logger = logging.getLogger(__name__)


class OllamaLLMProvider(LLMProvider):
    def __init__(self, base_url: str, model: str, timeout_seconds: int) -> None:
        self._base_url = base_url.rstrip("/")
        self._model = model
        self._timeout_seconds = timeout_seconds

    async def stream_chat(self, messages: list[LLMMessage]) -> AsyncIterator[str]:
        payload = {
            "model": self._model,
            "messages": [{"role": m.role, "content": m.content} for m in messages],
            "stream": True,
        }
        try:
            async with httpx.AsyncClient(timeout=self._timeout_seconds) as client:
                async with client.stream("POST", f"{self._base_url}/api/chat", json=payload) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if not line.strip():
                            continue
                        chunk = json.loads(line)
                        content = chunk.get("message", {}).get("content")
                        if content:
                            yield content
                        if chunk.get("done"):
                            break
        except httpx.TimeoutException as exc:
            logger.error("llm.ollama_timeout model=%s", self._model)
            raise TimeoutError(f"Ollama request timed out after {self._timeout_seconds}s") from exc
        except httpx.HTTPError as exc:
            logger.error("llm.ollama_error model=%s error=%s", self._model, exc)
            raise RuntimeError(f"Ollama request failed: {exc}") from exc
