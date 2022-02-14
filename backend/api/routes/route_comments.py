from db.session import get_db
from fastapi import APIRouter, Depends
from schemas.comment import CommentShow, CommentCreate
from db.repository.comments import create_new_comment, retrieve_all_comments, retrieve_comments_by_post_id, delete_comment_by_id
from sqlalchemy.orm import Session
from schemas.user import UserCreate
from typing import List
from api.routes.route_login import get_current_user_from_token

router = APIRouter()

img_url_types = ['absolute', 'relative']


@router.post("/create", response_model=CommentShow)
def create_comment(given_comment: CommentCreate, db: Session = Depends(get_db), current_user: UserCreate = Depends(get_current_user_from_token)):
    return create_new_comment(given_comment=given_comment, current_user=current_user, db=db,)


@router.get("/all", response_model=List[CommentShow])
def get_all_comments(db: Session = Depends(get_db)):
    return retrieve_all_comments(db=db)


@router.get("/get/{given_post_id}", response_model=List[CommentShow])
def get_comment_by_post_id(given_post_id: int, db: Session = Depends(get_db)):
    return retrieve_comments_by_post_id(given_post_id=given_post_id, db=db)


@router.delete("/delete/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db), current_user: UserCreate = Depends(get_current_user_from_token)):
    return delete_comment_by_id(comment_id=comment_id, db=db, current_user=current_user)
