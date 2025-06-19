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
from typing import List, Optional
import logging
import requests

# === Setup logging ===
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

class ChatResponse(BaseModel):
    text: str
    isBot: bool = True
    status: str = "success"

# === Service Initialization ===
app = FastAPI(
    title="Prawin's AI Chatbot API",
    description="Personal portfolio chatbot with semantic search",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://prawinportfolio.vercel.app", "http://localhost:3000"],  # Added localhost for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
qa_pairs = []
index = None
embedder = None
model = None

def load_jsonl(filepath: str) -> List[dict]:
    """Load JSONL file with error handling"""
    data = []
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if line:
                    try:
                        data.append(json.loads(line))
                    except json.JSONDecodeError as e:
                        logger.warning(f"Invalid JSON on line {line_num}: {e}")
                        continue
        logger.info(f"Successfully loaded {len(data)} QA pairs from {filepath}")
    except FileNotFoundError:
        logger.error(f"JSONL file not found: {filepath}")
    except Exception as e:
        logger.error(f"Error loading JSONL file: {e}")

    return data

@app.on_event("startup")
async def initialize_services():
    """Initialize all services on startup"""
    global qa_pairs, model

    try:
        logger.info("=== STARTING INITIALIZATION ===")

        # Load QA pairs
        if os.path.exists(Config.JSONL_PATH):
            pass
            qa_pairs.extend(load_jsonl(Config.JSONL_PATH))
            logger.info(f"Loaded {len(qa_pairs)} QA pairs")
        else:
            logger.warning(f"JSONL file not found: {Config.JSONL_PATH}")
            # Create sample data as fallback
            qa_pairs.extend([
                {
                    "instruction": "Who is Prawin?",
                    "output": "Prawin is a software developer with expertise in web development and AI."
                },
                {
                    "instruction": "What are Prawin's skills?",
                    "output": "Prawin has skills in Python, JavaScript, React, FastAPI, and machine learning."
                }
            ])
            logger.info("Using fallback sample data")

        # Check API key availability
        if Config.API_KEY:
            logger.info("Gemini API key configured successfully")
            model = True  # Just a flag to indicate API is available
        else:
            logger.warning("GEMINI_API_KEY not found in environment variables")
            model = None

        # Pre-load embedder and index for better performance
        get_embedder()
        get_index()

        logger.info("=== INITIALIZATION COMPLETE ===")

    except Exception as e:
        logger.error(f"Startup error: {e}")
        raise

def get_index():
    """Lazy load FAISS index with error handling"""
    global index
    if index is None:
        try:
            import faiss
            if os.path.exists(Config.INDEX_PATH):
                logger.info("Loading FAISS index...")
                index = faiss.read_index(Config.INDEX_PATH)
                logger.info("FAISS index loaded successfully")
            else:
                logger.warning(f"FAISS index file not found: {Config.INDEX_PATH}")
        except ImportError:
            logger.warning("FAISS not installed. Falling back to keyword search.")
        except Exception as e:
            logger.error(f"Failed to load FAISS index: {e}")
    return index

def get_embedder():
    """Lazy load embedder with error handling"""
    global embedder
    if embedder is None:
        try:
            from sentence_transformers import SentenceTransformer
            logger.info("Loading sentence transformer...")
            embedder = SentenceTransformer(Config.EMBEDDER_NAME)
            logger.info("Sentence transformer loaded successfully")
        except ImportError:
            logger.warning("sentence-transformers not installed. Falling back to keyword search.")
        except Exception as e:
            logger.error(f"Failed to load embedder: {e}")
    return embedder

def semantic_search(query: str) -> List[dict]:
    """Semantic search with fallback to keyword search"""
    try:
        embedder_model = get_embedder()
        index_model = get_index()

        if embedder_model is None or index_model is None:
            logger.info("Falling back to keyword search...")
            return keyword_search(query)

        # Ensure we have data to search
        if not qa_pairs:
            logger.warning("No QA pairs available for search")
            return []

        query_vec = embedder_model.encode([query]).astype('float32')
        distances, indices = index_model.search(query_vec, min(Config.TOP_N, len(qa_pairs)))

        results = []
        for idx in indices[0]:
            if 0 <= idx < len(qa_pairs):
                results.append(qa_pairs[idx])

        return results

    except Exception as e:
        logger.error(f"Semantic search failed: {e}")
        return keyword_search(query)

def keyword_search(query: str) -> List[dict]:
    """Simple keyword-based fallback search"""
    if not qa_pairs:
        return []

    query_lower = query.lower()
    query_words = query_lower.split()
    matches = []

    for pair in qa_pairs:
        instruction_lower = pair.get('instruction', '').lower()
        output_lower = pair.get('output', '').lower()

        # Calculate relevance score
        score = 0
        for word in query_words:
            if word in instruction_lower:
                score += 2  # Higher weight for instruction matches
            if word in output_lower:
                score += 1

        if score > 0:
            matches.append((score, pair))

    # Sort by relevance score and return top results
    matches.sort(key=lambda x: x[0], reverse=True)
    return [pair for _, pair in matches[:Config.TOP_N]]

def build_context(hits: List[dict]) -> str:
    """Build context from search results"""
    if not hits:
        return "No specific information found."

    context_parts = []
    for i, pair in enumerate(hits, 1):
        instruction = pair.get('instruction', 'No question')
        output = pair.get('output', 'No answer')
        context_parts.append(f"Example {i}:\nQ: {instruction}\nA: {output}")

    return "\n\n".join(context_parts)

def generate_response(user_message: str, context: str) -> str:
    """Generate response using Gemini API"""
    if not Config.API_KEY:
        return "Sorry, the AI service is currently unavailable. Please try again later."

    try:
        # Prepare the prompt
        prompt = f"""You are Prawin's personal AI assistant. Answer questions about Prawin based on the provided context.

Context about Prawin:
{context}

User Question: {user_message}

Instructions:
- Answer in a friendly, professional tone
- Be concise but informative
- If the question isn't directly answered in the context, provide a helpful response based on what you know
- Always respond as if you're representing Prawin

Answer:"""

        # Prepare the API request
        headers = {
            "Authorization": f"Bearer {Config.API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "gemini-1.5-flash",  # Using OpenAI-compatible endpoint
            "messages": [
                {
                    "role": "system",
                    "content": "You are Prawin's personal AI assistant. Be helpful, friendly, and professional."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 500,
            "temperature": 0.7
        }

        # Make the API request
        url = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
        response = requests.post(url, headers=headers, json=payload, timeout=30)

        if response.status_code == 200:
            response_data = response.json()
            if 'choices' in response_data and len(response_data['choices']) > 0:
                return response_data['choices'][0]['message']['content'].strip()
            else:
                logger.error(f"Unexpected API response format: {response_data}")
                return "I'm sorry, I received an unexpected response format."
        else:
            logger.error(f"API request failed: {response.status_code} - {response.text}")
            return f"Sorry, I encountered an error (HTTP {response.status_code}). Please try again."

    except requests.exceptions.Timeout:
        logger.error("API request timeout")
        return "Sorry, the request timed out. Please try again."
    except requests.exceptions.RequestException as e:
        logger.error(f"API request error: {e}")
        return "Sorry, I encountered a network error. Please try again."
    except Exception as e:
        logger.error(f"Generation error: {e}")
        return "Sorry, I encountered an error generating a response. Please try again."

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Prawin's AI Chatbot API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/chat",
            "health": "/health",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "qa_pairs_loaded": len(qa_pairs),
            "embedder_loaded": embedder is not None,
            "index_loaded": index is not None,
            "api_key_configured": Config.API_KEY is not None
        }
    }

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint"""
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")

        # Perform semantic search
        hits = semantic_search(request.message.strip())
        context = build_context(hits)

        # Generate response
        bot_response = generate_response(request.message, context)

        return ChatResponse(
            text=bot_response,
            isBot=True,
            status="success"
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return ChatResponse(
            text="Sorry, I encountered an error processing your request. Please try again.",
            isBot=True,
            status="error"
        )

@app.get("/qa-pairs")
async def get_qa_pairs():
    """Get all QA pairs (for debugging)"""
    return {
        "count": len(qa_pairs),
        "pairs": qa_pairs[:5] if qa_pairs else []  # Return first 5 for preview
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8002)),
        reload=True,
        log_level="info"
    )