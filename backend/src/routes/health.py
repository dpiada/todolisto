from fastapi import APIRouter
import typing as T

router = APIRouter()

@router.get(
    "/health",
    responses={
        200: {
            "description": "Healthcheck ok",
            "content": {
                "application/json": {
                    "example": {"status": "ok"}
                }
            },
        }
    }
)
async def health_check() -> T.Dict[str, str]:
    """
    The function `health_check` returns a dictionary with a key "status" and value "ok".
    :return: A dictionary with the key "status" and value "ok" is being returned.
    """
    return {"status": "ok"}
