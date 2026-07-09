from sqlalchemy.orm import Session
from app.repositories.message_repository import MessageRepository

class MemoryService:

    def add_message(self, db: Session, chat_id: int, role: str, content: str):
        repo = MessageRepository(db)
        repo.create(chat_id=chat_id, role=role, content=content)

    def get_history_text(self, db: Session, chat_id: int, limit: int = 6) -> str:
        if not chat_id:
            return ""
            
        repo = MessageRepository(db)
        messages = repo.get_by_chat_id(chat_id, limit=limit)
        
        history = []
        for message in messages:
            # Map role to Display string
            role_display = "User" if message.role == "user" else "Assistant"
            history.append(f"{role_display}: {message.content}")

        return "\n".join(history)

memory_service = MemoryService()