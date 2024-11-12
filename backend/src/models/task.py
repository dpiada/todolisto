from datetime import date
from typing import Literal
from pydantic import BaseModel

class TaskRequest(BaseModel):
    title: str
    description: str
    date: date
    priority: Literal['high', 'normal', 'low'] = 'normal' 
    status: bool

class TaskResponse(BaseModel):
    id: str 
    title: str
    description: str
    date: date
    priority: Literal['high', 'normal', 'low'] = 'normal' 
    status: bool
