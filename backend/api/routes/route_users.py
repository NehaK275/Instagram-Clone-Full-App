from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.repository.users import create_user
from db.session import get_db
from schemas.user import UserCreate, ShowUser
from api.routes.route_login import get_current_user_from_token

router = APIRouter()


@router.post("/create", response_model=ShowUser)
def create_new_user(given_user: UserCreate, db: Session = Depends(get_db)):
    return create_user(given_user=given_user, db=db)


@router.post('/lifetime')
def lifetime(current_user: UserCreate = Depends(get_current_user_from_token)):
    return {"detail": "Succeed"}
