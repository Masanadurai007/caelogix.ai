from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import BlogPost
from schemas import BlogPostSummary, BlogPostDetail

router = APIRouter()


@router.get("", response_model=List[BlogPostSummary])
def list_posts(db: Session = Depends(get_db)):
    posts = db.query(BlogPost).order_by(BlogPost.published_at.desc()).all()
    return posts


@router.get("/{slug}", response_model=BlogPostDetail)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter_by(slug=slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Article not found")
    return post
