from fastapi import APIRouter, Depends

from app.schemas.summary_schema import (
    SummaryRequest,
    SummaryResponse
)

from app.services.summary_service.summary_service import SummaryService
from app.auth.dependencies import get_current_user
from app.models.user import User



router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)

summary_service = SummaryService()


@router.post("/", response_model=SummaryResponse)
async def generate_summary(request: SummaryRequest, current_user: User = Depends(get_current_user)):

    summary = summary_service.generate(request.topic, user_id=current_user.id)

    return SummaryResponse(
        summary=summary
    )