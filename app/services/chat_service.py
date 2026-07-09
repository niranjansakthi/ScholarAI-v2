from app.services.memory_service import memory_service
from app.services.query_rewriter_service import rewrite_query
from app.services.retrieval_service import retrieve_documents
from app.services.context_builder import build_context
from app.services.llm_service import generate_llm_response
from app.repositories.message_repository import MessageRepository
from fastapi import HTTPException


from app.repositories.chat_repository import ChatRepository
from sqlalchemy.orm import Session

class ChatService:

    def chat(
        self,
        db: Session,
        question: str,
        user_id: int,
        chat_id: int | None = None,
    ) -> tuple[str, int]:

        # 1. Ensure a chat exists
        if chat_id is not None:
            # Validate: the chat must exist AND belong to this user
            repo = ChatRepository(db)
            chat = repo.get_by_id(chat_id)
            if not chat or chat.user_id != user_id:
                raise HTTPException(status_code=404, detail="Chat not found")
        else:
            # First message — auto-create a new chat
            repo = ChatRepository(db)
            chat = repo.create(user_id=user_id, title=question[:50])
            chat_id = chat.id

        # 2. Load previous conversation
        history = memory_service.get_history_text(db, chat_id)

        # 2. Rewrite follow-up question
        rewritten_question = rewrite_query(
            question=question,
            history=history,
        )

        print(f"Original : {question}")
        print(f"Rewritten: {rewritten_question}")

        # 3. Retrieve documents for this user only
        retrieved_docs = retrieve_documents(
            question=rewritten_question,
            user_id=user_id,
        )

        # 4. Build context
        context = build_context(retrieved_docs)

        # 5. Generate answer
        answer = generate_llm_response(
            question=question,
            context=context,
            history=history,
        )

        # 6. Save conversation
        memory_service.add_message(
            db=db,
            chat_id=chat_id,
            role="user",
            content=question,
        )

        memory_service.add_message(
            db=db,
            chat_id=chat_id,
            role="assistant",
            content=answer,
        )

        return answer, chat_id

    def get_user_chats(self, db: Session, user_id: int):
        repo = ChatRepository(db)
        chats = repo.get_by_user(user_id)
        return [{"id": chat.id, "title": chat.title, "created_at": chat.created_at} for chat in chats]

    def get_chat_history(self, db: Session, chat_id: int, user_id: int):
        repo = ChatRepository(db)
        chat = repo.get_by_id(chat_id)
        if not chat or chat.user_id != user_id:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        msg_repo = MessageRepository(db)
        messages = msg_repo.get_by_chat_id(chat_id, limit=100)
        return [{"id": msg.id, "role": msg.role, "content": msg.content, "created_at": msg.created_at} for msg in messages]

    def rename_chat(self, db: Session, chat_id: int, user_id: int, new_title: str):
        repo = ChatRepository(db)
        chat = repo.get_by_id(chat_id)
        if not chat or chat.user_id != user_id:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        repo.update_title(chat, new_title)
        return chat

    def delete_chat(self, db: Session, chat_id: int, user_id: int):
        repo = ChatRepository(db)
        chat = repo.get_by_id(chat_id)
        if not chat or chat.user_id != user_id:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        repo.delete(chat)