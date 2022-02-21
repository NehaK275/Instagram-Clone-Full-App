from db.base_class import Base
from sqlalchemy import String, Column, Integer, DateTime


class Photos(Base):
    id = Column(Integer, primary_key=True, index=True)
    path = Column(String, unique=True, default=False)
    username = Column(String, nullable=False)
    timestamp = Column(DateTime)