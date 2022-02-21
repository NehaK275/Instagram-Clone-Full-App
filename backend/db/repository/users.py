from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, date
from schemas.user import UserCreate
from db.models.users import Users
from core.hashing import Hasher


def create_user(given_user: UserCreate, db: Session):
    if not validate_given_user(given_user=given_user):
        raise (HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Password, Username lengths must be > 5, Email length must be > 4 with '@' '.'"))
    if check_what_exists(given_user=given_user, db=db):
        raise (HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"{check_what_exists(username=given_user.username, email=given_user.email, db=db)} already exists."))
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


def check_what_exists(given_user: UserCreate, db: Session):
    if db.query(Users).filter(Users.username == given_user.username).first():
        return 'Username'
    elif db.query(Users).filter(Users.email == given_user.email).first():
        return 'Email'
    return None


def validate_given_user(given_user: UserCreate):
    if len(given_user.username) > 5 and len(given_user.password) > 5 and len(given_user.email) > 4 and '@' in given_user.email and '.' in given_user.email:
        return True
    return False