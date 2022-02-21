from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from schemas.post import PostCreate
from db.models.posts import Posts
from db.models.photos import Photos
from schemas.user import UserCreate


def create_post(given_post: PostCreate, db: Session, current_user: UserCreate):
    if not verify_photo_user(username=current_user.username, url=given_post.img_url, db=db):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="You're not permitted to use the photo for more details or if you think we're wrong contact us.")
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


def get_all_posts(db: Session, account: UserCreate):
    all_posts = db.query(Posts).all()
    for post in all_posts:
        if account:
            post.owned = account.username == post.user.username
        else:
            post.owned = False
        for comment in post.comments:
            if account:
                comment.owned = account.username == comment.username
            else:
                comment.owned = False
    return all_posts


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
        raise HTTPException(status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                            detail=f"You're not allowed to delete post {post_id}")


def addImageToDB(path: str, current_user: UserCreate, db: Session):
    new_photo = Photos(
        path=path,
        username=current_user.username,
        timestamp=datetime.now()
    )
    db.add(new_photo)
    db.commit()
    db.refresh(new_photo)
    return True


def verify_photo_user(username: str, url: str, db: Session):
    photo = db.query(Photos).filter(Photos.path == url).first()
    if not photo:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="You're not permitted to use the photo for more details or if you think we're wrong contact us.")
    return photo.username == username
