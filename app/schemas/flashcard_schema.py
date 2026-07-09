from pydantic import BaseModel


class FlashcardRequest(BaseModel):
    topic: str


class Flashcard(BaseModel):
    question: str
    answer: str


class FlashcardResponse(BaseModel):
    flashcards: list[Flashcard]