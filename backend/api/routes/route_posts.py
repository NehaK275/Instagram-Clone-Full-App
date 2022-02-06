from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.repository.posts import create_post
from db.session import get_db
from schemas.post import PostShow, PostCreate

router = APIRouter()


@router.post("/create")
def create_new_post(given_post: PostCreate, db: Session = Depends(get_db)):
    return create_post(given_post=given_post, db=db)
