# import json
# import faiss
# from sentence_transformers import SentenceTransformer
# import numpy as np
# import google.generativeai as genai
#
# # === CONFIG ===
# API_KEY = "AIzaSyC30o6U8GkbXc7ajxkpMRj8A6ritQ1QynU"   # <-- Replace with yours
# MODEL_NAME = "gemini-1.5-flash"
# JSONL_PATH = "prawin_dataset.jsonl"
#
# # === LOAD JSONL ===
# def load_jsonl(filepath):
#     data = []
#     with open(filepath, 'r', encoding='utf-8') as f:
#         for line in f:
#             line = line.strip()
#             if line:
#                 data.append(json.loads(line))
#     return data
#
# # === BUILD EMBEDDING INDEX ===
# def build_faiss_index(qa_pairs, embedder):
#     questions = [pair['instruction'] for pair in qa_pairs]
#     embeddings = embedder.encode(questions)
#     dim = embeddings.shape[1]
#     index = faiss.IndexFlatL2(dim)
#     index.add(np.array(embeddings).astype('float32'))
#     return index, embeddings, questions
#
# # === SEARCH TOP N ===
# def semantic_search(query, embedder, index, questions, qa_pairs, top_n=2):
#     query_vec = embedder.encode([query]).astype('float32')
#     distances, indices = index.search(query_vec, top_n)
#     hits = []
#     for idx in indices[0]:
#         hits.append(qa_pairs[idx])
#     return hits
#
# # === BUILD CONTEXT ===
# def build_context(hits):
#     context = []
#     for pair in hits:
#         context.append(f"Q: {pair['instruction']}\nA: {pair['output']}")
#     return "\n\n".join(context)
#
# # === MAIN ===
# def main():
#     # 1. Load data
#     qa_pairs = load_jsonl(JSONL_PATH)
#
#     # 2. Load embedder
#     embedder = SentenceTransformer('all-MiniLM-L6-v2')
#
#     # 3. Build FAISS index
#     index, embeddings, questions = build_faiss_index(qa_pairs, embedder)
#
#     # 4. Configure Gemini
#     genai.configure(api_key=API_KEY)
#     model = genai.GenerativeModel(MODEL_NAME)
#
#     # 5. User question (paraphrased or real)
#     user_question = "How did Prawin perform at Odoo x Paradox?"
#
#     # 6. Find top hits
#     hits = semantic_search(user_question, embedder, index, questions, qa_pairs, top_n=2)
#
#     # 7. Build context
#     context = build_context(hits)
#
#     # 8. Generate response
#     prompt = f"""
#     Context:
#     {context}
#
#     User: {user_question}
#     """
#
#     response = model.generate_content(prompt)
#
#     print("=== MODEL RESPONSE ===")
#     print(response.text)
#
# if __name__ == "__main__":
#     main()


# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from typing import List
import os

from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
# === Configuration ===
class Config:
    API_KEY = os.getenv("GEMINI_API_KEY")
    MODEL_NAME = "gemini-1.5-flash"
    JSONL_PATH = "prawin_dataset.jsonl"
    EMBEDDER_NAME = "all-MiniLM-L6-v2"
    TOP_N = 3

# === Data Models ===
class Message(BaseModel):
    text: str
    isBot: bool = False

class ChatRequest(BaseModel):
    message: str

# === Service Initialization ===
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
qa_pairs = []
index = None
embedder = SentenceTransformer(Config.EMBEDDER_NAME)
model = None

@app.on_event("startup")
async def initialize_services():
    global qa_pairs, index, model

    # Load dataset
    qa_pairs = load_jsonl(Config.JSONL_PATH)

    # Build FAISS index
    questions = [pair['instruction'] for pair in qa_pairs]
    embeddings = embedder.encode(questions)
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings).astype('float32'))

    # Initialize Gemini
    genai.configure(api_key=Config.API_KEY)
    model = genai.GenerativeModel(Config.MODEL_NAME)

# === Core Functions ===
def load_jsonl(filepath: str) -> List[dict]:
    data = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line:
                data.append(json.loads(line))
    return data

def semantic_search(query: str) -> List[dict]:
    query_vec = embedder.encode([query]).astype('float32')
    distances, indices = index.search(query_vec, Config.TOP_N)
    return [qa_pairs[idx] for idx in indices[0]]

def build_context(hits: List[dict]) -> str:
    return "\n\n".join(
        f"Q: {pair['instruction']}\nA: {pair['output']}"
        for pair in hits
    )

def generate_response(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text

# === API Endpoints ===
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # 1. Perform semantic search
        hits = semantic_search(request.message)

        # 2. Build context
        context = build_context(hits)

        # 3. Generate response
        prompt = f"""Context about Prawin:
        {context}
        
        User Question: {request.message}
        Please answer concisely and professionally:"""

        bot_response = generate_response(prompt)

        return Message(text=bot_response, isBot=True)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

