from pydantic import BaseModel
from typing import List
from datetime import datetime

class ChatRenameRequest(BaseModel):
    new_title: str

class ChatItem(BaseModel):
    id: int
    title: str
    created_at: datetime

class ChatListResponse(BaseModel):
    chats: List[ChatItem]

class MessageItem(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime

class ChatHistoryResponse(BaseModel):
    messages: List[MessageItem]
