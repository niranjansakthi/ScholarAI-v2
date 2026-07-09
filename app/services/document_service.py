from sqlalchemy.orm import Session
from fastapi import UploadFile
from app.services.ingestion_service import IngestionService
from app.repositories.document_repository import DocumentRepository
from app.vectordb.vectordb import delete_vectors
from fastapi import HTTPException

class DocumentService:
    def __init__(self, db: Session):
        self.db = db
        self.ingestion_service = IngestionService()
        self.repo = DocumentRepository(db)

    async def upload_pdf(self, file: UploadFile, user_id: int):
        await self.ingestion_service.ingest_pdf(file, user_id)
        self.repo.create(
            filename=file.filename,
            source="pdf",
            user_id=user_id,
        )

    async def upload_handwritten(self, file: UploadFile, user_id: int):
        await self.ingestion_service.ingest_handwritten(file, user_id)
        self.repo.create(
            filename=file.filename,
            source="handwritten",
            user_id=user_id,
        )

    async def upload_youtube(self, url: str, user_id: int):
        await self.ingestion_service.ingest_youtube(url, user_id)
        self.repo.create(
            filename=url,
            source="youtube",
            user_id=user_id,
        )

    def delete_document(self, document_id: int, user_id: int):
        document = self.repo.get_by_id(document_id)
        if not document or document.user_id != user_id:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete from ChromaDB
        delete_vectors(user_id=user_id, filename=document.filename)

        # Delete from SQL
        self.repo.delete(document)
