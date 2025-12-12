# Prawin Portfolio

A full-stack portfolio application with Next.js frontend and Python backend.

## Project Structure

```
Prawin-Portfolio/
├── frontend/          # Next.js React application
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries
│   ├── public/        # Static assets
│   ├── styles/        # CSS styles
│   └── package.json   # Frontend dependencies
└── backend/           # Python backend
    ├── main.py        # Main backend application
    ├── backend.py     # Backend logic
    ├── build_index.py # Index building script
    ├── test.py        # Test files
    ├── prawin_dataset.jsonl # Dataset
    ├── embeddings.npy # ML embeddings
    ├── index.faiss    # FAISS index
    └── requirements.txt # Python dependencies
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```