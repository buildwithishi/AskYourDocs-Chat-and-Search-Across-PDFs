from functools import lru_cache

from app.ai.llm.base import LLMProvider
from app.ai.llm.ollama_provider import OllamaLLMProvider
from app.ai.llm.openai_compatible_provider import OpenAICompatibleLLMProvider
from app.core.config import get_settings

_OPENAI_DEFAULT_BASE_URL = "https://api.openai.com/v1"
_GROQ_BASE_URL = "https://api.groq.com/openai/v1"
_OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"


@lru_cache
def get_llm_provider() -> LLMProvider:
    settings = get_settings()
    provider = settings.llm_provider.lower()

    if provider == "ollama":
        return OllamaLLMProvider(
            base_url=settings.ollama_base_url,
            model=settings.ollama_model,
            timeout_seconds=settings.llm_timeout_seconds,
        )
    if provider == "openai":
        return OpenAICompatibleLLMProvider(
            base_url=settings.openai_base_url or _OPENAI_DEFAULT_BASE_URL,
            api_key=settings.openai_api_key,
            model=settings.openai_model,
            timeout_seconds=settings.llm_timeout_seconds,
        )
    if provider == "groq":
        return OpenAICompatibleLLMProvider(
            base_url=_GROQ_BASE_URL,
            api_key=settings.groq_api_key,
            model=settings.groq_model,
            timeout_seconds=settings.llm_timeout_seconds,
        )
    if provider == "openrouter":
        return OpenAICompatibleLLMProvider(
            base_url=_OPENROUTER_BASE_URL,
            api_key=settings.openrouter_api_key,
            model=settings.openrouter_model,
            timeout_seconds=settings.llm_timeout_seconds,
        )

    raise ValueError(f"Unknown LLM_PROVIDER: {settings.llm_provider!r}")
