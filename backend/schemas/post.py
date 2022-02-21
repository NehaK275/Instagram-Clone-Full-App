from pydantic import BaseModel
from datetime import datetime
from typing import List
from schemas.comment import CommentShow


class PostCreate(BaseModel):
    img_url: str
    img_url_type: str
    caption: str


class User(BaseModel):
    username: str

    class Config:  # to convert non dict obj to json
        orm_mode = True


class PostShow(BaseModel):
    id: int
    owned: bool
    img_url: str
    img_url_type: str
    caption: str
    timestamp: datetime
    user: User
    comments: List[CommentShow]

    class Config:  # to convert non dict obj to json
        orm_mode = True
