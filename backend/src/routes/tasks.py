from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from src.providers.mongo import Mongo
from src.models.task import TaskResponse, TaskRequest

mongo_client = Mongo()

router = APIRouter()

@router.get("/tasks/")
def get_tasks(date = None, priority = None, status = None, order_by = 'date', ascending = True):
    tasks = mongo_client.read(date, priority, status, order_by, ascending)
    response = [
            TaskResponse(
                id=str(task["_id"]),
                title=task["title"],
                description=task["description"],
                date=task["date"],
                priority=task["priority"],
                status=task["status"]
            )
            for task in tasks
        ]
        
    return response

@router.get("/task/{id}")
def get_task(id):
    task = mongo_client.read_one(object_id=id)
    response = TaskResponse(
                id=str(task["_id"]),
                title=task["title"],
                description=task["description"],
                date=task["date"],
                priority=task["priority"],
                status=task["status"]
            )

    return response

@router.put("/update/{id}", status_code=200)
def update_task(id, task: TaskRequest):
    updated_id = mongo_client.update(id,jsonable_encoder(task))
    task = mongo_client.create(jsonable_encoder(task))
    response = TaskResponse(
            id=str(task["_id"]),
            title=task["title"],
            description=task["description"],
            date=task["date"],
            priority=task["priority"],
            status=task["status"]
        )
    return response

@router.post("/add-task", status_code=201)
def add_task(task: TaskRequest):
    task = mongo_client.create(jsonable_encoder(task))
    response = TaskResponse(
            id=str(task["_id"]),
            title=task["title"],
            description=task["description"],
            date=task["date"],
            priority=task["priority"],
            status=task["status"]
        )
    return response

@router.delete("/task/{id}")
def delete_task(id):
    deleted_id = mongo_client.delete(object_id=id)
    return {f"Deleted ID: {deleted_id}"}

