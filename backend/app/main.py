from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router

app = FastAPI(
    title="LLM Playground API",
    description="AI Playground Backend powered by FastAPI and Ollama",
    version="1.0.0"
)

# CORS Configuration

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Chat Routes

app.include_router(
    chat_router,
    prefix="/api/v1",
    tags=["Chat"]
)

# Root Endpoint

@app.get("/")
async def root():
    return {
        "message": "LLM Playground API Running",
        "status": "online",
        "version": "1.0.0"
    }

# Health Check

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "llm-playground-api"
    }
