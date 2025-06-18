import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import json

EMBEDDER_NAME = "paraphrase-MiniLM-L3-v2"
JSONL_PATH = "app/api/chatbot/prawin_dataset.jsonl"
INDEX_PATH = "index.faiss"
EMBEDDINGS_PATH = "embeddings.npy"

# Load dataset

data = []
with open(JSONL_PATH, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        line = line.strip()
        if not line:
            continue  # skip empty lines
        try:
            obj = json.loads(line)
            data.append(obj)
        except json.JSONDecodeError as e:
            print(f"Error in line {i}: {line}")
            raise e


questions = [pair['instruction'] for pair in data]

# Embed
embedder = SentenceTransformer(EMBEDDER_NAME)
embeddings = embedder.encode(questions, show_progress_bar=True)

# Build index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings).astype('float32'))

# Save index + embeddings
faiss.write_index(index, INDEX_PATH)
np.save(EMBEDDINGS_PATH, embeddings)
