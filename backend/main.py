from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from routers import contact, chat, blog, leads

app = FastAPI(
    title="Caelogix API",
    description="Backend API for the Caelogix marketing site: contact form, AI chatbot, blog, and lead capture.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(blog.router, prefix="/api/blog", tags=["blog"])
app.include_router(leads.router, prefix="/api/leads", tags=["leads"])


@app.get("/api/health", tags=["health"])
def health():
    return {"status": "ok", "service": "caelogix-backend"}
