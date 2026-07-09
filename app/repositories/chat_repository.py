from sqlalchemy.orm import Session
from app.models.chat import Chat

class ChatRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, user_id: int, title: str) -> Chat:
        chat = Chat(user_id=user_id, title=title)
        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)
        return chat

    def get_by_id(self, chat_id: int) -> Chat | None:
        return self.db.query(Chat).filter(Chat.id == chat_id).first()

    def get_by_user(self, user_id: int) -> list[Chat]:
        return self.db.query(Chat).filter(Chat.user_id == user_id).all()

    def update_title(self, chat: Chat, new_title: str) -> Chat:
        chat.title = new_title
        self.db.commit()
        self.db.refresh(chat)
        return chat

    def delete(self, chat: Chat):
        self.db.delete(chat)
        self.db.commit()
