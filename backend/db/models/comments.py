from db.base_class import Base
from sqlalchemy import String, Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class Comments(Base):
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    text = Column(String, nullable=False)
    timestamp = Column(DateTime)
    post_id = Column(Integer, ForeignKey('posts.id'))
    post = relationship('Posts', back_populates='comments')