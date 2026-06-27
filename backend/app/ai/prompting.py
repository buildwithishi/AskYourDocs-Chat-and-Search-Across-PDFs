from abc import ABC, abstractmethod

from app.ai.llm.base import LLMMessage
from app.models.message import Message, MessageRole
from app.services.retrieval_service import RetrievedChunk

SYSTEM_PROMPT_TEMPLATE = """You are AskYourDocs AI, an assistant that answers questions strictly using \
the provided document excerpts.

Rules you must always follow:
1. Base your answer only on the context excerpts below. Do not use outside knowledge, \
and do not guess or invent facts, names, numbers, or sources.
2. If the context does not contain enough information to answer the question, you must \
clearly state that the information is not available in the uploaded documents. Do not \
attempt to answer from general knowledge in that case.
3. When you use information from an excerpt, cite it inline using its bracketed number, \
e.g. [1], matching the excerpt numbers below.
4. Be concise and directly answer the question; do not pad your answer with disclaimers \
beyond what is required by rule 2.

Context excerpts:
{context_block}
"""

NO_CONTEXT_BLOCK = "(No relevant excerpts were found in the user's documents for this question.)"


class PromptBuilder(ABC):
    @abstractmethod
    def build(
        self,
        *,
        question: str,
        retrieved_chunks: list[RetrievedChunk],
        history: list[Message],
    ) -> list[LLMMessage]:
        """Assemble the full message list (system + history + question) to send to the LLM."""


class RagPromptBuilder(PromptBuilder):
    def build(
        self,
        *,
        question: str,
        retrieved_chunks: list[RetrievedChunk],
        history: list[Message],
    ) -> list[LLMMessage]:
        context_block = self._format_context(retrieved_chunks)
        system_message = LLMMessage(role="system", content=SYSTEM_PROMPT_TEMPLATE.format(context_block=context_block))

        messages: list[LLMMessage] = [system_message]
        for past_message in history:
            role = "assistant" if past_message.role == MessageRole.assistant else "user"
            messages.append(LLMMessage(role=role, content=past_message.content))
        messages.append(LLMMessage(role="user", content=question))
        return messages

    @staticmethod
    def _format_context(chunks: list[RetrievedChunk]) -> str:
        if not chunks:
            return NO_CONTEXT_BLOCK
        parts = []
        for index, chunk in enumerate(chunks, start=1):
            page_part = f", page {chunk.page_number}" if chunk.page_number is not None else ""
            parts.append(f"[{index}] (Document: {chunk.document_name}{page_part}): {chunk.text}")
        return "\n\n".join(parts)
