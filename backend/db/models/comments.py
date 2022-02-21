from db.base_class import Base
from sqlalchemy import String, Column, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class Comments(Base):
    id = Column(Integer, primary_key=True, index=True)
    owned = Column(Boolean(), default=False)
    username = Column(String, nullable=False)
    text = Column(String, nullable=False)
    timestamp = Column(DateTime)
    post_id = Column(Integer, ForeignKey('posts.id'))
    post = relationship('Posts', back_populates='comments')