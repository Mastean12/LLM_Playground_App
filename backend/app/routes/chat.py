from fastapi import APIRouter

from app.services.llm_service import (
    generate_response
)

from app.schemas.chat import ChatRequest
router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):

    response = generate_response(
    request.prompt
    )

    return {
        "response": response
    }