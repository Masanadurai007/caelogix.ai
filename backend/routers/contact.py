from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from models import ContactSubmission
from schemas import ContactCreate, ContactResponse
from email_utils import send_contact_notification

router = APIRouter()


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    submission = ContactSubmission(
        name=payload.name.strip(),
        email=str(payload.email),
        company=(payload.company or "").strip() or None,
        message=payload.message.strip(),
        service_interest=(payload.service_interest or "").strip() or None,
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    send_contact_notification(
        name=submission.name,
        email=submission.email,
        company=submission.company,
        message=submission.message,
        service_interest=submission.service_interest,
    )

    return ContactResponse(success=True, contact=submission)