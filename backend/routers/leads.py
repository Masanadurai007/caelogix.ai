from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Lead
from schemas import LeadOut
from auth import require_admin

router = APIRouter()


@router.get("", response_model=List[LeadOut])
def list_leads(db: Session = Depends(get_db), _admin: str = Depends(require_admin)):
    leads = db.query(Lead).order_by(Lead.created_at.desc()).all()
    return leads
