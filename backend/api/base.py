from fastapi import APIRouter
from api.routes import route_users, route_posts, route_login, route_comments

api_routers = APIRouter()

api_routers.include_router(route_users.router, prefix="", tags=["Users API"])
api_routers.include_router(route_posts.router, prefix="/posts", tags=["Posts API"])
api_routers.include_router(route_comments.router, prefix="/comments", tags=["Comments API"])
api_routers.include_router(route_login.router, prefix="/login", tags=["Login API"])