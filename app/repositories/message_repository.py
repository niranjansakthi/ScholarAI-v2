from sqlalchemy.orm import Session
from app.models.message import Message

class MessageRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, chat_id: int, role: str, content: str) -> Message:
        message = Message(chat_id=chat_id, role=role, content=content)
        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)
        return message

    def get_by_chat_id(self, chat_id: int, limit: int = 50) -> list[Message]:
        return self.db.query(Message)\
            .filter(Message.chat_id == chat_id)\
            .order_by(Message.created_at.asc())\
            .limit(limit)\
            .all()
