from pydantic import BaseModel
from datetime import datetime


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
    img_url: str
    img_url_type: str
    caption: str
    timestamp: datetime
    user: User

    class Config:  # to convert non dict obj to json
        orm_mode = True
