from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from schemas.comment import CommentCreate
from db.models.comments import Comments
from schemas.user import UserCreate
from db.repository.posts import get_post_by_id


def create_new_comment(given_comment: CommentCreate, db: Session, current_user: UserCreate):
    validation(given_comment=given_comment, db=db)
    new_comment = Comments(
        username=current_user.username,
        text=given_comment.text,
        timestamp=datetime.now().date(),
        post_id=given_comment.post_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def retrieve_all_comments(db: Session):
    return db.query(Comments).all()


def retrieve_comments_by_post_id(given_post_id: int, db: Session):
    comments = db.query(Comments).filter(Comments.post_id == given_post_id).all()
    get_post_by_id(post_id=given_post_id, db=db)
    return comments


def delete_comment_by_id(comment_id: int, db: Session, current_user: UserCreate, ):
    comment = db.query(Comments).filter(Comments.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Comment {comment_id} not found.")
    if comment.username == current_user.username:
        db.delete(comment)
        db.commit()
        return {"detail": f"Deleted comment {comment_id} successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                            detail=f"You're not allowed to delete comment {comment_id}")


def validation(given_comment: CommentCreate, db: Session):
    get_post_by_id(post_id=given_comment.post_id, db=db)  # Raise exception if not exist, Can also add a checking if post is private or not.
    if len(given_comment.text.strip()) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The comment can't be empty")