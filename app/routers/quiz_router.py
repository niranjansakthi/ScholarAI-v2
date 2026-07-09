from fastapi import APIRouter, Depends

from app.services.quiz_service.quiz_service import QuizService
from app.schemas.quiz_schemas import QuizRequest, QuizResponse
from app.auth.dependencies import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/Quiz",
    tags=["Quiz"]
)

quiz_service = QuizService()

@router.post("/", response_model=QuizResponse)
async def generate_quiz(request: QuizRequest, current_user: User = Depends(get_current_user)):
    quiz = quiz_service.generate(request.topic, user_id=current_user.id)
    return QuizResponse(quizzes=quiz)

