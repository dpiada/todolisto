from datetime import date
from typing import Literal
from pydantic import BaseModel

class TaskRequest(BaseModel):
    message: str
    date: date
    priority: Literal['high', 'normal', 'low'] = 'normal' 
    status: bool


class TaskResponse(BaseModel):
    id: str 
    message: str
    date: date
    priority: Literal['high', 'normal', 'low'] = 'normal' 
    status: bool
