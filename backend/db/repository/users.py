from sqlalchemy.orm import Session
from datetime import datetime, date
from schemas.user import UserCreate
from db.models.users import Users
from core.hashing import Hasher


def create_user(given_user: UserCreate, db: Session):
    new_user = Users(
        username=given_user.username,
        email=given_user.email,
        date_created=datetime.now().date(),
        is_active=True,
        hashed_password=Hasher.hash_password(given_user.password),
        is_superuser=False)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_username(username: str, db: Session):
    return db.query(Users).filter(Users.username == username).first()
