from fastapi import APIRouter, UploadFile, Depends
from sqlalchemy.orm import Session

from app.schemas import UploadResponse
from app.services.document_service import DocumentService
from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User


router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

@router.post("/pdf", response_model=UploadResponse)
async def upload_pdf(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document_service = DocumentService(db)
    await document_service.upload_pdf(file, current_user.id)

    return UploadResponse(
        message="PDF uploaded successfully."
    )


@router.post("/handwritten", response_model=UploadResponse)
async def upload_handwritten(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    document_service = DocumentService(db)
    await document_service.upload_handwritten(file, current_user.id)

    return UploadResponse(
        message="Handwritten document uploaded successfully."
    )