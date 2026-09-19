"""Seed the database with starter blog posts and the chatbot's knowledge base.

Run with:  python seed.py

Embeddings for the knowledge base are only generated if OPENAI_API_KEY is
set; otherwise knowledge_chunks are inserted without embeddings and the
chatbot will use its keyword-search fallback instead of vector similarity.
"""

from datetime import datetime, timedelta

from database import SessionLocal
from models import BlogPost, KnowledgeChunk, HAS_VECTOR
from chatbot.knowledge_base import KNOWLEDGE_BASE
from config import settings

BLOG_POSTS = [
    {
        "title": "Shipping agentic systems safely: where to put the checkpoints",
        "slug": "shipping-agentic-systems-safely",
        "excerpt": (
            "Multi-step AI agents fail differently than single-turn chatbots. Here is "
            "how we decide which actions need human approval."
        ),
        "content": (
            "Agentic systems are powerful because they can take multiple steps toward "
            "a goal without a human directing every action. That same property is what "
            "makes them risky if built carelessly.\n\n"
            "At Caelogix, we design every agent workflow as an explicit state graph "
            "with named nodes for each step: retrieve, decide, act, verify. Anything "
            "that writes to a production system, sends a message on a client's behalf, "
            "or spends money gets a checkpoint where a human reviews the proposed "
            "action before it executes.\n\n"
            "This does not slow the system down as much as it sounds like it would. "
            "Most of an agent's work is research and drafting, which can run "
            "autonomously. The checkpoints sit at the few places where being wrong is "
            "expensive, which is exactly where they are worth the pause."
        ),
        "published_at": datetime.utcnow() - timedelta(days=14),
    },
    {
        "title": "RAG that holds up in production, not just in the demo",
        "slug": "rag-that-holds-up-in-production",
        "excerpt": (
            "Retrieval-augmented generation looks easy until your knowledge base "
            "changes weekly. Notes from three production deployments."
        ),
        "content": (
            "Every RAG demo looks the same: static documents, a handful of test "
            "questions, impressive answers. Production is different. Knowledge bases "
            "change weekly, documents contradict each other as policies update, and "
            "users ask questions the demo never covered.\n\n"
            "The fix is not a bigger model. It's treating retrieval as a data pipeline "
            "with the same rigor as any other production data system: versioned "
            "embeddings, a re-indexing schedule tied to content updates, and logging "
            "of what was retrieved for every answer so you can debug a bad response "
            "after the fact.\n\n"
            "We also test retrieval and generation separately. If an answer is wrong, "
            "the first question is always whether the right context was retrieved at "
            "all, before touching the prompt."
        ),
        "published_at": datetime.utcnow() - timedelta(days=58),
    },
    {
        "title": "When not to use an AI agent",
        "slug": "when-not-to-use-an-ai-agent",
        "excerpt": (
            "Agentic AI is not the right answer for every workflow. A practical "
            "checklist for deciding when a simpler system wins."
        ),
        "content": (
            "Every workflow we get asked to automate gets the same first question: "
            "does this actually need an agent, or would a deterministic script and a "
            "single LLM call do the job with far less risk?\n\n"
            "An agent earns its complexity when the number of steps is not known in "
            "advance, when the system needs to react to intermediate results, and when "
            "the cost of a wrong turn is recoverable. If none of those are true, a "
            "simple pipeline is usually more reliable, cheaper to run, and easier to "
            "debug than a general-purpose agent.\n\n"
            "We would rather ship the boring solution that works than the impressive "
            "one that needs babysitting."
        ),
        "published_at": datetime.utcnow() - timedelta(days=100),
    },
]


def seed_blog_posts(db):
    created = 0
    for post_data in BLOG_POSTS:
        existing = db.query(BlogPost).filter_by(slug=post_data["slug"]).first()
        if existing:
            continue
        db.add(BlogPost(**post_data))
        created += 1
    db.commit()
    print(f"Seeded {created} blog posts (skipped any that already existed).")


def seed_knowledge_base(db):
    if db.query(KnowledgeChunk).count() > 0:
        print("Knowledge base already seeded, skipping.")
        return

    embeddings_client = None
        # Note: Groq doesn't offer an embeddings endpoint. The knowledge base
    # falls back to keyword search (see chatbot/knowledge_base.py) instead
    # of vector similarity. If you later add an embeddings provider,
    # wire it up here.
    if False:
      pass

    for chunk in KNOWLEDGE_BASE:
        db.add(KnowledgeChunk(title=chunk["title"], content=chunk["content"]))
    db.commit()
    print(f"Seeded {len(KNOWLEDGE_BASE)} knowledge base chunks.")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_blog_posts(db)
        seed_knowledge_base(db)
    finally:
        db.close()
