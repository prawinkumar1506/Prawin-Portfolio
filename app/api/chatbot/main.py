from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import faiss
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from typing import List
import os
from dotenv import load_dotenv

# === Load environment variables ===
load_dotenv()

# === Configuration ===

# === Configuration ===
# === Configuration ===
class Config:
    BASE_DIR = os.path.dirname(__file__)  # chatbot/
    APP_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "..", "..", "app"))
    # BASE_DIR is: project/app/api/chatbot
    # APP_DIR is: project/app

    JSONL_PATH = os.path.join(BASE_DIR, "prawin_dataset.jsonl")

    # Corrected paths to point to app/app/ directory
    INDEX_PATH = os.path.join(BASE_DIR, "..", "..", "app", "index.faiss")
    EMBEDDINGS_PATH = os.path.join(BASE_DIR, "..", "..", "app", "embeddings.npy")

    API_KEY = os.getenv("GEMINI_API_KEY")
    MODEL_NAME = "gemini-1.5-flash"
    EMBEDDER_NAME = "paraphrase-MiniLM-L3-v2"
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
    allow_origins=["https://prawinportfolio.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

qa_pairs = []
index = None
embedder = None  # Lazy load
model = None

def load_jsonl(filepath):
    data = []
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                data.append(json.loads(line))
    return data

@app.on_event("startup")
async def initialize_services():
    global qa_pairs, model
    print("Loading dataset...")
    qa_pairs.extend(load_jsonl(Config.JSONL_PATH))
    print(f"Loaded {len(qa_pairs)} QA pairs.")

    print("Configuring Gemini...")
    genai.configure(api_key=Config.API_KEY)
    model = genai.GenerativeModel(Config.MODEL_NAME)
    print("Startup complete.")

def get_index():
    global index
    if index is None:
        print(f"Loading FAISS index from: {Config.INDEX_PATH}")
        index = faiss.read_index(Config.INDEX_PATH)

    return index


def get_embedder():
    global embedder
    if embedder is None:
        print("Loading embedder...")
        embedder = SentenceTransformer(Config.EMBEDDER_NAME)
    return embedder

def semantic_search(query: str) -> List[dict]:
    embedder = get_embedder()
    index = get_index()
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

# === API Endpoint ===
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        hits = semantic_search(request.message)
        context = build_context(hits)
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
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
