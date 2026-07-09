# 🧠 ScholarAI

> **A Production-Style AI Learning Assistant powered by Retrieval-Augmented Generation (RAG).**

ScholarAI is an AI-powered study platform that transforms PDFs, handwritten notes, and YouTube lectures into a personalized knowledge base. Instead of relying solely on a general-purpose LLM, ScholarAI retrieves relevant information from a user's own learning materials before generating responses, enabling more accurate and personalized studying.

---

# ✨ Features

## 🔐 Authentication

* JWT Authentication
* Secure password hashing (bcrypt)
* User-specific data isolation
* Protected API routes

---

## 📚 Knowledge Base

Upload and organize learning resources:

* 📄 PDF Documents
* ✍️ Handwritten Notes (OCR)
* 🎥 YouTube Videos

Each uploaded resource becomes part of the user's personal AI knowledge base.

---

## 🤖 AI Chat

Chat naturally with your uploaded content.

Features include:

* Retrieval-Augmented Generation (RAG)
* Hybrid Search
* Context-aware responses
* Persistent conversation memory
* Personalized responses based on uploaded documents

---

## 🔍 Hybrid Retrieval Pipeline

ScholarAI improves retrieval quality by combining multiple retrieval strategies.

Pipeline:

PDF / YouTube / Handwritten Notes

↓

Document Loaders

↓

Chunking

↓

Embeddings

↓

ChromaDB Vector Search

*

BM25 Keyword Search

↓

Cross-Encoder Reranking

↓

Context Builder

↓

LLM

↓

Final Response

---

## 📝 AI Study Tools

Generate learning material instantly:

* AI Summary
* Key Point Extraction
* Flashcards
* Quiz Generation

---

## 💬 Persistent Chat Memory

Unlike traditional RAG demos,

ScholarAI stores:

* Chat Sessions
* Individual Messages
* User Conversations

allowing users to continue previous study sessions without losing context.

---

# 🏗️ Architecture

Frontend (React)

↓

FastAPI

↓

JWT Authentication

↓

Router Layer

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL

↓

AI Pipeline

---

# 🧩 Tech Stack

## Frontend

* React
* CSS
* Axios

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic

## AI

* LangChain
* Sentence Transformers
* ChromaDB
* BM25 Retrieval
* Cross-Encoder Reranker
* Groq LLM

## Authentication

* JWT
* OAuth2
* bcrypt

---

# 📂 Project Structure

```text
frontend/
│
├── components/
├── pages/
├── services/
└── assets/

backend/
│
├── auth/
├── database/
├── models/
├── repositories/
├── routers/
├── schemas/
├── services/
├── loaders/
├── vectordb/
└── utility/
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/<your-username>/ScholarAI.git
```

Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
# Windows
.venv\Scripts\activate

pip install -r requirements.txt

alembic upgrade head

uvicorn app.main:app --reload
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

JWT_SECRET=

GROQ_API_KEY=

HF_TOKEN=
```

---

# 📈 Future Improvements

* Multiple Chat Sessions
* Rename/Delete Chats
* Document Management Dashboard
* Streaming AI Responses
* Role-based Access
* Cloud Vector Database
* Deployment
* Multi-language OCR
* Semantic Document Search
* Team Collaboration

---

# 🎯 What I Learned

Building ScholarAI was more than integrating an LLM.

This project helped me understand:

* Production backend architecture
* JWT authentication
* SQLAlchemy relationships
* Alembic migrations
* Repository Pattern
* Retrieval-Augmented Generation
* Hybrid Retrieval
* Conversational Memory
* AI system design
* React + FastAPI integration

---

# 📜 License

This project is intended for educational and portfolio purposes.

---

## 👨‍💻 Author

**Ranju Parker**

If you found this project interesting, feel free to connect with me on LinkedIn or explore the repository.
