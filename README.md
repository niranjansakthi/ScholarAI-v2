# ScholarAI-v2

ScholarAI is an AI-powered study assistant that allows users to upload documents (PDFs, images, handwritten notes) and YouTube links to generate summaries, extract key points, create interactive flashcards, and run custom quizzes with adaptive AI.

## Features
- **AI Chat:** Converse contextually with your knowledge base using RAG.
- **AI Ingestion:** Process PDFs, images, handwritten text (OCR), and YouTube transcriptions.
- **Smart Summarization & Key Points:** Instantly parse complex texts.
- **Interactive Quizzes & Flashcards:** Active recall training generated automatically.
- **User Space Isolation:** Complete JWT authentication, isolated chats, and document mapping in PostgreSQL.

## Architecture
- **Backend:** FastAPI, PostgreSQL, SQLAlchemy ORM, Alembic migrations, ChromaDB (Vector Search), LangChain.
- **Frontend:** React, Axios, React Router.
- **Theme:** Luxury AI Dark Mode (Warm Premium Minimal styling).
