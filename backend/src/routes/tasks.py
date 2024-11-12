from fastapi import APIRouter

router = APIRouter()

@router.get("/tasks")
async def get_tasks():

    return {"status": "get all tasks"}

@router.get("/task/{id}")
async def get_task():

    return {"status": "get one task"}

@router.post("/add-task")
async def add_task():

    return {"status": "add one task"}


@router.delete("/task/{id}")
async def delete_task():

    return {"status": "delete a task"}

