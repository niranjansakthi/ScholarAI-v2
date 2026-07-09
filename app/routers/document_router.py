from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.document_schema import DocumentResponse
from app.services.document_service import DocumentService
from app.auth.dependencies import get_current_user
from app.database.database import get_db
from app.models.user import User

router = APIRouter(prefix="/document", tags=["Document"])

@router.delete("/{document_id}", response_model=DocumentResponse)
async def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    document_service = DocumentService(db)
    document_service.delete_document(document_id=document_id, user_id=current_user.id)
    return DocumentResponse(message="Document deleted successfully.")
