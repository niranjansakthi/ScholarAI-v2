from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas import YoutubeRequest, UploadResponse
from app.services.document_service import DocumentService
from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User


router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

@router.post("/youtube", response_model=UploadResponse)
async def upload_youtube(
    request: YoutubeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document_service = DocumentService(db)
    await document_service.upload_youtube(str(request.url), current_user.id)

    return UploadResponse(
        message="YouTube video processed successfully."
    )