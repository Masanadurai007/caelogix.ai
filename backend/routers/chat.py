import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ChatSession, ChatMessage, Lead
from schemas import ChatRequest, ChatResponse
from chatbot.agent import CaelogixChatAgent
from deps import get_chat_agent

router = APIRouter()


def _get_or_create_session(db: Session, raw_session_id: str | None) -> ChatSession:
    session_uuid = None
    if raw_session_id:
        try:
            session_uuid = uuid.UUID(raw_session_id)
        except ValueError:
            session_uuid = None

    session = None
    if session_uuid:
        session = db.query(ChatSession).filter_by(session_id=session_uuid).first()

    if session is None:
        session = ChatSession(session_id=session_uuid or uuid.uuid4())
        db.add(session)
        db.commit()
        db.refresh(session)

    return session


@router.post("", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    agent: CaelogixChatAgent = Depends(get_chat_agent),
):
    message = payload.message.strip()
    session = _get_or_create_session(db, payload.session_id)

    history = [{"role": m.role, "content": m.content} for m in session.messages]

    user_message = ChatMessage(session_id=session.id, role="user", content=message)
    db.add(user_message)
    db.commit()

    result = agent.respond(session_id=str(session.session_id), message=message, history=history)

    assistant_message = ChatMessage(session_id=session.id, role="assistant", content=result["reply"])
    db.add(assistant_message)

    if result.get("escalate"):
        existing_lead = (
            db.query(Lead)
            .filter_by(source="chatbot", qualified_need=f"session:{session.session_id}")
            .first()
        )
        if not existing_lead:
            db.add(Lead(source="chatbot", qualified_need=f"session:{session.session_id}"))

    db.commit()

    return ChatResponse(
        session_id=str(session.session_id),
        reply=result["reply"],
        escalate=result.get("escalate", False),
    )
