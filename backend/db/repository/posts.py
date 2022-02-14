from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from schemas.post import PostCreate
from db.models.posts import Posts
from schemas.user import UserCreate


def create_post(given_post: PostCreate, db: Session, current_user: UserCreate):
    new_post = Posts(
        img_url=given_post.img_url,
        img_url_type=given_post.img_url_type,
        caption=given_post.caption,
        timestamp=datetime.now(),
        creator_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(Posts).all()


def get_post_by_id(post_id: int, db: Session):
    post = db.query(Posts).filter(Posts.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Post not found.')
    return post


def delete_post_by_id(post_id: int, db: Session, current_user: UserCreate):
    post = db.query(Posts).filter(Posts.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post {post_id} not found.")
    if post.creator_id == current_user.id:
        db.delete(post)
        db.commit()
        return {"detail": f"Deleted post {post_id} successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail=f"You're not allowed to delete post {post_id}")