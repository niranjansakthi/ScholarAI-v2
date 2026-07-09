from pydantic import BaseModel

class QuizRequest(BaseModel):
    topic: str
    number_of_questions: int = 10

class Quiz(BaseModel):
    question: str
    options: list[str]
    answer: str

class QuizResponse(BaseModel):
    quizzes: list[Quiz]
