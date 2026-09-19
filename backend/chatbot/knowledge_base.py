"""Knowledge base used to ground the chatbot's answers about Caelogix.

Chunked for keyword-search retrieval (no vector DB required, since Groq
doesn't offer an embeddings API). Covers services, process, pricing
posture, industries, and common objections so the assistant can answer
real visitor questions rather than only the happy path.
"""

KNOWLEDGE_BASE = [
    {
        "title": "Company overview",
        "content": (
            "Caelogix is a Chennai-based software and AI engineering studio. We design, build, "
            "and ship chatbots, web platforms, generative AI integrations, agentic AI systems, "
            "and AI consulting for teams that need software they can actually run their "
            "business on, not a prototype that stalls after the demo."
        ),
    },
    {
        "title": "Chatbot Development service",
        "content": (
            "We build conversational assistants that resolve real requests instead of giving "
            "scripted small talk. This includes support widgets grounded in a company's own "
            "knowledge base, lead-qualification bots that ask about budget and timeline, and "
            "internal helpdesk assistants. Built with LangChain and LangGraph, backed by "
            "PostgreSQL for conversation history."
        ),
    },
    {
        "title": "Web Development service",
        "content": (
            "We build marketing sites and web applications on React, Tailwind CSS, and FastAPI, "
            "focused on speed, clarity, and conversion. This covers everything from a company's "
            "public website to internal dashboards and customer-facing web apps, all "
            "mobile-responsive and production-ready from day one."
        ),
    },
    {
        "title": "Generative AI Integration service",
        "content": (
            "We add drafting, summarization, and search-by-meaning (semantic search) to tools a "
            "team already uses. Typical projects include document summarization assistants, "
            "internal knowledge search over support tickets or wikis, and automated report "
            "generation from existing data."
        ),
    },
    {
        "title": "Agentic AI Systems service",
        "content": (
            "We build multi-step AI workflows that take real action, using LangGraph to define "
            "explicit state graphs with tools, retries, and human-approval checkpoints for "
            "anything consequential. This means the system is capable of autonomous work while "
            "staying auditable and safe — a person reviews anything that matters before it "
            "executes."
        ),
    },
    {
        "title": "AI Consulting service",
        "content": (
            "For teams unsure whether or where AI actually helps, we run a short engagement: "
            "audit current workflows and data, score the feasibility of proposed AI use cases, "
            "and deliver a prioritized, build-vs-buy roadmap. We are upfront when AI is not the "
            "right answer for a given problem."
        ),
    },
    {
        "title": "Engagement process",
        "content": (
            "Our process has four stages: Discover, Design, Build, and Deploy. We map workflows "
            "and constraints first, scope the architecture and interface together, ship in "
            "short reviewable cycles so clients see working software throughout, and launch with "
            "monitoring and handoff documentation, staying close through the first weeks live."
        ),
    },
    {
        "title": "Pricing and timelines",
        "content": (
            "Pricing depends on project scope, so we don't quote a fixed number without a short "
            "discovery conversation first. Simple chatbot or single-page web projects are "
            "typically the fastest turnaround; multi-page sites, agentic systems, or custom "
            "integrations take longer depending on complexity. The best next step for a specific "
            "quote is the contact form."
        ),
    },
    {
        "title": "Industries served",
        "content": (
            "We work with teams in e-commerce, healthcare, fintech, and general enterprise IT, "
            "as well as smaller local businesses. Each industry has different compliance and "
            "workflow needs, which shapes how a system gets designed — for example, healthcare "
            "and fintech projects get extra care around data handling and audit trails."
        ),
    },
    {
        "title": "Location and working style",
        "content": (
            "Caelogix is based in Chennai, India, and works with clients locally and remotely. "
            "We're a small, hands-on team — the people scoping a project are the same people "
            "building it, so nothing gets lost between a sales conversation and delivery."
        ),
    },
    {
        "title": "Getting started",
        "content": (
            "The fastest way to start is the contact form on the website, with a short "
            "description of the project and which service is the best fit. We typically "
            "respond within one business day and follow up with a short discovery call before "
            "any pricing or timeline commitment."
        ),
    },
    {
        "title": "Human-in-the-loop safety",
        "content": (
            "For any system that takes autonomous action — especially agentic AI — we build in "
            "checkpoints where a human reviews or approves consequential steps before they "
            "execute. This is a deliberate design choice, not an afterthought: capability and "
            "control are treated as equally important."
        ),
    },
]


def keyword_search(query: str, top_k: int = 2):
    """Small fallback retrieval used since Groq has no embeddings endpoint.

    Scores each knowledge chunk by shared lowercase words with the query.
    """
    query_words = set(query.lower().split())
    scored = []
    for chunk in KNOWLEDGE_BASE:
        chunk_words = set((chunk["title"] + " " + chunk["content"]).lower().split())
        score = len(query_words & chunk_words)
        if score > 0:
            scored.append((score, chunk))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [chunk for _, chunk in scored[:top_k]]