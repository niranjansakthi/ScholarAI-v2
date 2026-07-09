from fastapi import APIRouter
from fastapi import Depends

from app.schemas import ChatRequest, ChatResponse
from app.schemas.chat_schema import ChatListResponse, ChatHistoryResponse, ChatRenameRequest
from app.services.chat_service import ChatService
from app.auth.dependencies import get_current_user
from app.database.database import get_db
from sqlalchemy.orm import Session
from app.models.user import User

router = APIRouter(prefix="/chat", tags=["Chat"])

chat_service = ChatService()


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    answer, chat_id = chat_service.chat(
        db=db,
        question=request.question,
        chat_id=request.chat_id if request.chat_id else None,
        user_id=current_user.id
    )

    return ChatResponse(answer=answer, chat_id=chat_id)

@router.get("/", response_model=ChatListResponse)
async def list_chats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    chats = chat_service.get_user_chats(db=db, user_id=current_user.id)
    return ChatListResponse(chats=chats)

@router.get("/{chat_id}/history", response_model=ChatHistoryResponse)
async def get_history(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    messages = chat_service.get_chat_history(db=db, chat_id=chat_id, user_id=current_user.id)
    return ChatHistoryResponse(messages=messages)

@router.put("/{chat_id}", response_model=dict)
async def rename_chat(
    chat_id: int,
    request: ChatRenameRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    chat_service.rename_chat(db=db, chat_id=chat_id, user_id=current_user.id, new_title=request.new_title)
    return {"message": "Chat renamed successfully"}

@router.delete("/{chat_id}", response_model=dict)
async def delete_chat(
    chat_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    chat_service.delete_chat(db=db, chat_id=chat_id, user_id=current_user.id)
    return {"message": "Chat deleted successfully"}