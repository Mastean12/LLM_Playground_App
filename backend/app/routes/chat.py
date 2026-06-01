from fastapi import APIRouter

from app.services.llm_service import (
    generate_response
)

router = APIRouter()


@router.post("/chat")
def chat(prompt: str):

    response = generate_response(
        prompt
    )

    return {
        "response": response
    }