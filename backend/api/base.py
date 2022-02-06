from fastapi import APIRouter
from api.routes import route_users, route_posts

api_routers = APIRouter()

api_routers.include_router(route_users.router, prefix="", tags=["Users API"])
api_routers.include_router(route_posts.router, prefix="/posts", tags=["Posts API"])