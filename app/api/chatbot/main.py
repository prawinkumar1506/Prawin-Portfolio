# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import json
# import faiss
# from sentence_transformers import SentenceTransformer
# import google.generativeai as genai
# from typing import List
# import os
# from dotenv import load_dotenv
#
# # === Load environment variables ===
# load_dotenv()
#
# # === Configuration ===
#
# # === Configuration ===
# # === Configuration ===
# class Config:
#     BASE_DIR = os.path.dirname(__file__)  # chatbot/
#     APP_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "..", "..", "app"))
#     # BASE_DIR is: project/app/api/chatbot
#     # APP_DIR is: project/app
#
#     JSONL_PATH = os.path.join(BASE_DIR, "prawin_dataset.jsonl")
#
#     # Corrected paths to point to app/app/ directory
#     INDEX_PATH = os.path.join(BASE_DIR, "..", "..", "app", "index.faiss")
#     EMBEDDINGS_PATH = os.path.join(BASE_DIR, "..", "..", "app", "embeddings.npy")
#
#     API_KEY = os.getenv("GEMINI_API_KEY")
#     MODEL_NAME = "gemini-1.5-flash"
#     EMBEDDER_NAME = "paraphrase-MiniLM-L3-v2"
#     TOP_N = 3
#
#
#
# # === Data Models ===
# class Message(BaseModel):
#     text: str
#     isBot: bool = False
#
# class ChatRequest(BaseModel):
#     message: str
#
# # === Service Initialization ===
# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["https://prawinportfolio.vercel.app"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# qa_pairs = []
# index = None
# embedder = None  # Lazy load
# model = None
#
# def load_jsonl(filepath):
#     data = []
#     with open(filepath, "r", encoding="utf-8") as f:
#         for line in f:
#             line = line.strip()
#             if line:
#                 data.append(json.loads(line))
#     return data
#
# @app.on_event("startup")
# async def initialize_services():
#     global qa_pairs, model
#     try:
#         # print("Loading dataset...")
#         # qa_pairs.extend(load_jsonl(Config.JSONL_PATH))
#         # print(f"Loaded {len(qa_pairs)} QA pairs.")
#
#         print("Configuring Gemini...")
#         genai.configure(api_key=Config.API_KEY)
#         model = genai.GenerativeModel(Config.MODEL_NAME)
#
#         # Pre-load the index and embedder to catch any errors early
#         print("Pre-loading FAISS index and embedder...")
#         get_index()
#         get_embedder()
#
#         print("Startup complete.")
#     except Exception as e:
#         print(f"Startup failed: {e}")
#         # Don't crash the app, but log the error
#         import traceback
#         traceback.print_exc()
#
# def get_index():
#     global index
#     if index is None:
#         print(f"Loading FAISS index from: {Config.INDEX_PATH}")
#         index = faiss.read_index(Config.INDEX_PATH)
#
#     return index
#
#
# def get_embedder():
#     global embedder
#     if embedder is None:
#         print("Loading embedder...")
#         embedder = SentenceTransformer(Config.EMBEDDER_NAME)
#     return embedder
#
# def semantic_search(query: str) -> List[dict]:
#     embedder = get_embedder()
#     index = get_index()
#     query_vec = embedder.encode([query]).astype('float32')
#     distances, indices = index.search(query_vec, Config.TOP_N)
#     return [qa_pairs[idx] for idx in indices[0]]
#
# def build_context(hits: List[dict]) -> str:
#     return "\n\n".join(
#         f"Q: {pair['instruction']}\nA: {pair['output']}"
#         for pair in hits
#     )
#
# def generate_response(prompt: str) -> str:
#     response = model.generate_content(prompt)
#     return response.text
#
# # === API Endpoint ===
# @app.post("/chat")
# async def chat_endpoint(request: ChatRequest):
#     try:
#         hits = semantic_search(request.message)
#         context = build_context(hits)
#         prompt = f"""Context about Prawin:
#         {context}
#
#         User Question: {request.message}
#         Please answer concisely and professionally:"""
#         bot_response = generate_response(prompt)
#         return Message(text=bot_response, isBot=True)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
#
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import List

# === Load environment variables ===
load_dotenv()

# === Configuration ===
class Config:
    BASE_DIR = os.path.dirname(__file__)
    JSONL_PATH = os.path.join(BASE_DIR, "prawin_dataset.jsonl")
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

# Global variables - but don't load immediately
qa_pairs = []
index = None
embedder = None
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
    try:
        print("=== MINIMAL STARTUP ===")

        # Only load essential data
        if os.path.exists(Config.JSONL_PATH):
            qa_pairs.extend(load_jsonl(Config.JSONL_PATH))
            print(f"Loaded {len(qa_pairs)} QA pairs.")

        # Configure Gemini (lightweight)
        if Config.API_KEY:
            genai.configure(api_key=Config.API_KEY)
            model = genai.GenerativeModel(Config.MODEL_NAME)
            print("Gemini configured.")

        print("=== STARTUP COMPLETE (LIGHTWEIGHT) ===")

    except Exception as e:
        print(f"Startup error: {e}")

def get_index():
    """Lazy load FAISS index only when needed"""
    global index
    if index is None:
        try:
            import faiss
            print("Loading FAISS index...")
            index = faiss.read_index(Config.INDEX_PATH)
            print("FAISS index loaded.")
        except Exception as e:
            print(f"Failed to load FAISS index: {e}")
            return None
    return index

def get_embedder():
    """Lazy load embedder only when needed"""
    global embedder
    if embedder is None:
        try:
            from sentence_transformers import SentenceTransformer
            print("Loading sentence transformer...")
            embedder = SentenceTransformer(Config.EMBEDDER_NAME)
            print("Sentence transformer loaded.")
        except Exception as e:
            print(f"Failed to load embedder: {e}")
            return None
    return embedder

def semantic_search(query: str) -> List[dict]:
    """Semantic search with fallback to keyword search"""
    try:
        embedder_model = get_embedder()
        index_model = get_index()

        if embedder_model is None or index_model is None:
            print("Falling back to keyword search...")
            return keyword_search(query)

        query_vec = embedder_model.encode([query]).astype('float32')
        distances, indices = index_model.search(query_vec, Config.TOP_N)
        return [qa_pairs[idx] for idx in indices[0] if idx < len(qa_pairs)]

    except Exception as e:
        print(f"Semantic search failed: {e}")
        return keyword_search(query)

def keyword_search(query: str) -> List[dict]:
    """Simple keyword-based fallback search"""
    query_lower = query.lower()
    matches = []

    for pair in qa_pairs:
        instruction_lower = pair.get('instruction', '').lower()
        output_lower = pair.get('output', '').lower()

        if any(word in instruction_lower or word in output_lower
               for word in query_lower.split()):
            matches.append(pair)
            if len(matches) >= Config.TOP_N:
                break

    return matches[:Config.TOP_N] if matches else qa_pairs[:Config.TOP_N]

def build_context(hits: List[dict]) -> str:
    return "\n\n".join(
        f"Q: {pair.get('instruction', '')}\nA: {pair.get('output', '')}"
        for pair in hits
    )

def generate_response(prompt: str) -> str:
    if model is None:
        return "Sorry, the AI service is currently unavailable."

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Generation error: {e}")
        return "Sorry, I encountered an error generating a response."

@app.get("/")
async def root():
    return {"message": "Prawin's AI Chatbot API", "status": "running", "endpoints": ["/chat", "/health"]}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "memory_usage": "optimized"}

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
        print(f"Chat error: {e}")
        return Message(text="Sorry, I encountered an error processing your request.", isBot=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))