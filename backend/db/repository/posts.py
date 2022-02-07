from sqlalchemy.orm import Session
from datetime import datetime
from schemas.post import PostCreate
from db.models.posts import Posts


def create_post(given_post: PostCreate, db: Session):
    new_post = Posts(
        img_url=given_post.img_url,
        img_url_type=given_post.img_url_type,
        caption=given_post.caption,
        timestamp=datetime.now(),
        creator_id=given_post.creator_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all_posts(db: Session):
    return db.query(Posts).all()
