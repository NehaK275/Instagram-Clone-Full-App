from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.repository.users import create_user
from db.session import get_db
from schemas.user import UserCreate, ShowUser

router = APIRouter()


@router.post("/create", response_model=ShowUser)
def create_new_user(given_user: UserCreate, db: Session = Depends(get_db)):
    return create_user(given_user=given_user, db=db)
