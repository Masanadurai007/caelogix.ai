"""LangGraph agent powering the Caelogix chat widget.

The graph has two nodes:
  1. `retrieve`  - pulls relevant knowledge-base chunks for the user's message (RAG)
  2. `generate`  - calls the LLM with the system prompt, retrieved context, and
                   conversation history to produce a reply, and decides whether
                   the conversation should be escalated to a human via the
                   contact form.

If GROQ_API_KEY is not configured, the agent falls back to a simple
rule-based responder so the widget still works for local development and
demos without any API key.
"""

from typing import TypedDict, List

from chatbot.knowledge_base import keyword_search
from chatbot.system_prompt import SYSTEM_PROMPT

ESCALATION_TRIGGERS = [
    "talk to a human",
    "talk to your team",
    "speak to someone",
    "speak with someone",
    "quote",
    "pricing",
    "how much does it cost",
    "get started",
    "schedule a call",
    "book a call",
    "sign up",
    "ready to start",
]


class ChatState(TypedDict):
    session_id: str
    message: str
    history: List[dict]  # [{"role": "user"|"assistant", "content": str}]
    context: str
    reply: str
    escalate: bool


def _retrieve(state: ChatState) -> ChatState:
    chunks = keyword_search(state["message"], top_k=2)
    state["context"] = "\n\n".join(f"{c['title']}: {c['content']}" for c in chunks)
    return state


def _should_escalate(message: str) -> bool:
    lowered = message.lower()
    return any(trigger in lowered for trigger in ESCALATION_TRIGGERS)


def _generate_with_llm(state: ChatState, api_key: str, model: str) -> str:
    from langchain_groq import ChatGroq
    from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

    llm = ChatGroq(model=model, api_key=api_key, temperature=0.4)

    messages = [SystemMessage(content=SYSTEM_PROMPT)]
    if state["context"]:
        messages.append(
            SystemMessage(content=f"Relevant Caelogix knowledge base context:\n{state['context']}")
        )
    for turn in state["history"][-8:]:
        if turn["role"] == "user":
            messages.append(HumanMessage(content=turn["content"]))
        else:
            messages.append(AIMessage(content=turn["content"]))
    messages.append(HumanMessage(content=state["message"]))

    result = llm.invoke(messages)
    return result.content


def _generate_fallback(state: ChatState) -> str:
    """Simple, honest fallback used when no LLM API key is configured."""
    if state["context"]:
        return (
            f"{state['context'].split(': ', 1)[-1]} If you'd like specifics for your "
            "project, the contact form is the fastest way to reach our team."
        )
    return (
        "I can share general information about Caelogix's services (chatbots, web "
        "development, generative AI integration, agentic AI systems, and AI consulting), "
        "but for specifics on your project the contact form will get you to our team directly."
    )


def _generate(state: ChatState, api_key: str, model: str) -> ChatState:
    if api_key:
        try:
            state["reply"] = _generate_with_llm(state, api_key, model)
        except Exception as e:
            print(f"GROQ LLM CALL FAILED: {type(e).__name__}: {e}")
            state["reply"] = _generate_fallback(state)
    else:
        print("No GROQ_API_KEY configured — using fallback")
        state["reply"] = _generate_fallback(state)

    state["escalate"] = _should_escalate(state["message"])
    return state


def build_graph(api_key: str, model: str):
    """Builds and compiles the LangGraph state graph for the chat agent."""
    from langgraph.graph import StateGraph, END

    graph = StateGraph(ChatState)
    graph.add_node("retrieve", _retrieve)
    graph.add_node("generate", lambda s: _generate(s, api_key, model))

    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "generate")
    graph.add_edge("generate", END)

    return graph.compile()


class CaelogixChatAgent:
    """Thin wrapper so the API layer doesn't need to know LangGraph internals."""

    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model
        self._graph = None

    @property
    def graph(self):
        if self._graph is None:
            self._graph = build_graph(self.api_key, self.model)
        return self._graph

    def respond(self, session_id: str, message: str, history: List[dict]) -> dict:
        initial_state: ChatState = {
            "session_id": session_id,
            "message": message,
            "history": history,
            "context": "",
            "reply": "",
            "escalate": False,
        }
        final_state = self.graph.invoke(initial_state)
        return {"reply": final_state["reply"], "escalate": final_state["escalate"]}