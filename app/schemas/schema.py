from typing import Optional

from pydantic import BaseModel, HttpUrl


class ChatRequest(BaseModel):
    chat_id: int | None = None
    question: str


class ChatResponse(BaseModel):
    answer: str
    chat_id: int


class YoutubeRequest(BaseModel):
    url: Optional[HttpUrl]


class YoutubeResponse(BaseModel):
    message: str


class UploadRequest(BaseModel):
    file: str
    filename: str


class UploadResponse(BaseModel):
    message: str


# Backward-compatible aliases
uploadRequest = UploadRequest
uploadResponse = UploadResponse