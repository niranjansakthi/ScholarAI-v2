from fastapi import FastAPI
import app.models # Ensure all models are registered in SQLAlchemy

from app.routers import chat_router, pdf_upload_router, url_upload_router, flashcard_router, quiz_router, document_router
from fastapi.middleware.cors import CORSMiddleware
from app.routers.summary_router import router as summary_router

from app.routers.keypoint_router import router as keypoint_router

from app.routers.auth_router import router as auth_router


app = FastAPI()


app.include_router(pdf_upload_router.router)
app.include_router(url_upload_router.router)
app.include_router(chat_router.router)
app.include_router(flashcard_router.router)
app.include_router(quiz_router.router)
app.include_router(document_router.router)
app.include_router(summary_router)
app.include_router(keypoint_router)
app.include_router(auth_router)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {
        "app": "ScholarAI Backend",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }
