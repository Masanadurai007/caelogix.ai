import uuid
from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from database import Base

try:
    from pgvector.sqlalchemy import Vector

    HAS_VECTOR = True
except ImportError:  # pgvector not installed / not needed for basic runs
    HAS_VECTOR = False


class ContactSubmission(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    company = Column(String(150))
    message = Column(Text, nullable=False)
    service_interest = Column(String(150))
    created_at = Column(DateTime, default=datetime.utcnow)


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True)
    session_id = Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    messages = relationship(
        "ChatMessage", backref="session", cascade="all, delete-orphan", order_by="ChatMessage.created_at"
    )


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    role = Column(String(20), nullable=False)  # 'user' | 'assistant'
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True)
    name = Column(String(150))
    email = Column(String(150))
    qualified_need = Column(Text)
    budget_range = Column(String(80))
    timeline = Column(String(80))
    source = Column(String(20), default="chatbot")  # 'chatbot' | 'form'
    created_at = Column(DateTime, default=datetime.utcnow)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(220), unique=True, nullable=False, index=True)
    excerpt = Column(String(400))
    content = Column(Text, nullable=False)
    published_at = Column(DateTime, default=datetime.utcnow)


class KnowledgeChunk(Base):
    """RAG knowledge base used by the chatbot to answer FAQs about Caelogix."""

    __tablename__ = "knowledge_chunks"

    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    content = Column(Text, nullable=False)
    if False:
        embedding = Column(Vector(1536))
    created_at = Column(DateTime, default=datetime.utcnow)
