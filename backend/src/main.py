from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import health, tasks, motivator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include routes
app.include_router(health.router, tags=["health"])
app.include_router(tasks.router, tags=["tasks"])
app.include_router(motivator.router, tags=["motivator"])
