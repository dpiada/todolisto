from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from src.providers.mongo import Mongo
from src.models.task import TaskResponse, TaskRequest

mongo_client = Mongo(hostname="mongodb", port=27017, username="mongolone", password="monoglonepw", database_name="my_db", collection_name="notes")

router = APIRouter()

@router.get("/tasks")
def get_tasks():
    tasks = mongo_client.read()
    response = [
            TaskResponse(
                id=str(task["_id"]),
                message=task["message"],
                date=task["date"],
                priority=task["priority"],
                status=task["status"]
            )
            for task in tasks
        ]
        
    return response

@router.get("/task/:id")
def get_task(id):

    task = mongo_client.read_one(object_id=id)
    print(task)
    response = TaskResponse(
                id=str(task["_id"]),
                message=task["message"],
                date=task["date"],
                priority=task["priority"],
                status=task["status"]
            )

    return response


@router.post("/add-task")
def add_task(task: TaskRequest):
    inserted_id = mongo_client.create(jsonable_encoder(task))
    return {f"Inserted ID: {inserted_id}"}


@router.delete("/task/:id")
def delete_task(id):
    deleted_id = mongo_client.delete(object_id=id)
    return {f"Deleted ID: {deleted_id}"}

