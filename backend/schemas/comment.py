from pydantic import BaseModel
from datetime import datetime


class CommentCreate(BaseModel):
    text: str
    post_id: int


class CommentShow(BaseModel):
    id: int
    username: str
    text: str
    timestamp: datetime

    class Config:  # to convert non dict obj to json
        orm_mode = True
