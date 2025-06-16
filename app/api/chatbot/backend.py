# app/api/chatbot/backend.py
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
from typing import Dict, List

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    text: str

# Predefined responses matching your frontend knowledge base
PREDEFINED_RESPONSES: Dict[str, str] = {
    "hello": "Hello! I'm here to tell you all about Prawin. What specifically would you like to know?",
    "hi": "Hi there! I can share information about Prawin's skills, projects, experience, and background. What interests you most?",
    "skills": "Prawin's technical skills include:\n• Frontend: React, Next.js, TypeScript\n• Backend: Node.js, Python\n• Databases: MongoDB, PostgreSQL\n• Cloud: AWS, GCP",
    # Add all other frontend responses here
}

def get_predefined_response(query: str) -> str:
    query_lower = query.lower()
    for key in PREDEFINED_RESPONSES:
        if key in query_lower:
            return PREDEFINED_RESPONSES[key]
    return ""

@app.post("/chat", response_model=Dict[str, str])
async def chat_endpoint(request: ChatRequest):
    try:
        user_message = request.text

        # First check predefined responses
        predefined_response = get_predefined_response(user_message)
        if predefined_response:
            return {"response": predefined_response}

        # Fallback to Mistral via Ollama
        ollama_response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": f"<|USER|>{user_message}<|ASSISTANT|>",
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "max_tokens": 150
                }
            }
        )

        if ollama_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Ollama service unavailable"
            )

        return {"response": ollama_response.json()["response"]}

    except requests.exceptions.RequestException as e:
        logging.error(f"Ollama connection error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Failed to connect to AI service"
        )
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
