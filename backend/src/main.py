from fastapi import FastAPI
from src.routes import health, tasks, motivator

app = FastAPI()

# Include routes
app.include_router(health.router, tags=["health"])
app.include_router(tasks.router, tags=["tasks"])
app.include_router(motivator.router, tags=["motivator"])
