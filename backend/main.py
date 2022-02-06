from fastapi import FastAPI
from core.config import settings
from db.session import engine
from db.base_class import Base
from api.base import api_routers


def configure_application():
    app = FastAPI(title=settings.PROJECT_TITLE, version=settings.PROJECT_VERSION)
    app.include_router(api_routers)
    Base.metadata.create_all(bind=engine)
    return app


app = configure_application()
