# import faiss
# import numpy as np
# from sentence_transformers import SentenceTransformer
# import json
#
# EMBEDDER_NAME = "paraphrase-MiniLM-L3-v2"
# JSONL_PATH = "app/api/chatbot/prawin_dataset.jsonl"
# INDEX_PATH = "index.faiss"
# EMBEDDINGS_PATH = "embeddings.npy"
#
# # Load dataset
#
# data = []
# with open(JSONL_PATH, "r", encoding="utf-8") as f:
#     for i, line in enumerate(f, 1):
#         line = line.strip()
#         if not line:
#             continue  # skip empty lines
#         try:
#             obj = json.loads(line)
#             data.append(obj)
#         except json.JSONDecodeError as e:
#             print(f"Error in line {i}: {line}")
#             raise e
#
#
# questions = [pair['instruction'] for pair in data]
#
# # Embed
# embedder = SentenceTransformer(EMBEDDER_NAME)
# embeddings = embedder.encode(questions, show_progress_bar=True)
#
# # Build index
# dimension = embeddings.shape[1]
# index = faiss.IndexFlatL2(dimension)
# index.add(np.array(embeddings).astype('float32'))
#
# # Save index + embeddings
# faiss.write_index(index, INDEX_PATH)
# np.save(EMBEDDINGS_PATH, embeddings)
import os
import json
import requests
import numpy as np
import faiss
from dotenv import load_dotenv
from tqdm import tqdm  # ✅ Add this

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
JSONL_PATH = "prawin_dataset.jsonl"
INDEX_PATH = "../../app/index.faiss"

def get_gemini_embedding(text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key={API_KEY}"
    payload = {
        "model": "models/embedding-001",
        "content": {
            "parts": [{"text": text}]
        }
    }
    response = requests.post(url, json=payload)
    response.raise_for_status()
    return response.json()["embedding"]["values"]

# 1. Load all instructions
all_texts = []
with open(JSONL_PATH, "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue  # skip empty line
        obj = json.loads(line)
        all_texts.append(obj["instruction"])

print(f"Found {len(all_texts)} instructions. Generating embeddings...")

# 2. Get embeddings with tqdm progress bar ✅
all_embeddings = []
for text in tqdm(all_texts, desc="Embedding with Gemini"):
    emb = get_gemini_embedding(text)
    all_embeddings.append(emb)

embeddings = np.array(all_embeddings).astype("float32")

# 3. Build FAISS index
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)
faiss.write_index(index, INDEX_PATH)

print(f"✅ Rebuilt FAISS index with dimension: {embeddings.shape[1]} and {len(all_texts)} vectors")
