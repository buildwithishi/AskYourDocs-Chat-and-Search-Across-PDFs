import json
import logging
from collections.abc import AsyncIterator

import httpx

from app.ai.llm.base import LLMMessage, LLMProvider

logger = logging.getLogger(__name__)


class OpenAICompatibleLLMProvider(LLMProvider):
    """Works against any OpenAI Chat Completions-compatible API: OpenAI itself, Groq, OpenRouter."""

    def __init__(self, base_url: str, api_key: str | None, model: str, timeout_seconds: int) -> None:
        self._base_url = base_url.rstrip("/")
        self._api_key = api_key
        self._model = model
        self._timeout_seconds = timeout_seconds

    async def stream_chat(self, messages: list[LLMMessage]) -> AsyncIterator[str]:
        if not self._api_key:
            raise RuntimeError(f"No API key configured for LLM provider at {self._base_url}")

        payload = {
            "model": self._model,
            "messages": [{"role": m.role, "content": m.content} for m in messages],
            "stream": True,
        }
        headers = {"Authorization": f"Bearer {self._api_key}"}

        try:
            async with httpx.AsyncClient(timeout=self._timeout_seconds) as client:
                async with client.stream(
                    "POST", f"{self._base_url}/chat/completions", json=payload, headers=headers
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if not line.startswith("data:"):
                            continue
                        data = line[len("data:") :].strip()
                        if data == "[DONE]":
                            break
                        chunk = json.loads(data)
                        delta = chunk.get("choices", [{}])[0].get("delta", {})
                        content = delta.get("content")
                        if content:
                            yield content
        except httpx.TimeoutException as exc:
            logger.error("llm.openai_compatible_timeout model=%s base_url=%s", self._model, self._base_url)
            raise TimeoutError(f"LLM request to {self._base_url} timed out after {self._timeout_seconds}s") from exc
        except httpx.HTTPError as exc:
            logger.error("llm.openai_compatible_error model=%s base_url=%s error=%s", self._model, self._base_url, exc)
            raise RuntimeError(f"LLM request to {self._base_url} failed: {exc}") from exc
