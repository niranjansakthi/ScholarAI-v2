from fastapi import APIRouter,Depends

from app.schemas.flashcard_schema import (FlashcardRequest,FlashcardResponse)

from app.services.flashcard_service.flashcard_service import FlashcardService
from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
     prefix="/flashcards",
    tags=["Flashcards"]
)

flashcard_service = FlashcardService()

@router.post("/", response_model=FlashcardResponse)
async def generate_flashcards(request: FlashcardRequest,current_user:User=Depends(get_current_user)):
    flashcards = flashcard_service.generate(request.topic, user_id=current_user.id)

    return FlashcardResponse(flashcards=flashcards)