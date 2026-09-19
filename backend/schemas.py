from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, ConfigDict


# ---------- Contact ----------

class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=150)
    message: str = Field(min_length=1)
    service_interest: Optional[str] = Field(default=None, max_length=150)


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    company: Optional[str] = None
    message: str
    service_interest: Optional[str] = None
    created_at: datetime


class ContactResponse(BaseModel):
    success: bool = True
    contact: ContactOut


# ---------- Chat ----------

class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str = Field(min_length=1)


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    escalate: bool = False


# ---------- Blog ----------

class BlogPostSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    excerpt: Optional[str] = None
    published_at: datetime


class BlogPostDetail(BlogPostSummary):
    content: str


# ---------- Leads ----------

class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: Optional[str] = None
    email: Optional[str] = None
    qualified_need: Optional[str] = None
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    source: Optional[str] = None
    created_at: datetime
