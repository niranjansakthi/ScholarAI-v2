from sqlalchemy.orm import Session

from app.models.document import Document


class DocumentRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        filename: str,
        source: str,
        user_id: int,
    ):

        document = Document(
            filename=filename,
            source=source,
            user_id=user_id,
        )

        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)

        return document

    def get_by_id(self, document_id: int) -> Document | None:
        return self.db.query(Document).filter(Document.id == document_id).first()

    def delete(self, document: Document):
        self.db.delete(document)
        self.db.commit()