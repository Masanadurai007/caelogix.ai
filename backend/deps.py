from functools import lru_cache

from chatbot.agent import CaelogixChatAgent
from config import settings


@lru_cache
def get_chat_agent() -> CaelogixChatAgent:
    """Cached singleton so the LangGraph graph is only built once per process."""
    return CaelogixChatAgent(api_key=settings.groq_api_key, model=settings.chat_model)
