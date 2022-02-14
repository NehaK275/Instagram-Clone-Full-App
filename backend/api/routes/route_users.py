from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.repository.users import create_user
from db.session import get_db
from schemas.user import UserCreate, ShowUser
from api.routes.route_login import get_current_user_from_token
from core.security import encode_jwt_access_token, decode_jwt_access_token

router = APIRouter()


@router.post("/create", response_model=ShowUser)
def create_new_user(given_user: UserCreate, db: Session = Depends(get_db)):
    return create_user(given_user=given_user, db=db)


@router.post("/analyse-key-debug-to-get-user-from-key")
def test(token: str, db: Session = Depends(get_db)):
    return get_current_user_from_token(token, db)


@router.post("/encode-debug-to-encode-data")
def encoder(token: dict):
    return encode_jwt_access_token(token)


@router.post("/decode-debug-to-decode-data")
def decoder(token: str):
    return decode_jwt_access_token(token)