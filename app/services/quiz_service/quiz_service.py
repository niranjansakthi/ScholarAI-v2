
from app.services.retrieval_service import retrieve_documents
from app.services.context_builder import build_context
from app.services.quiz_service.quiz_prompt import generate_quiz

import json 

class QuizService:

    def generate(self, topic: str, user_id: int, number_of_questions: int = 10) -> list:
        retrieved_docs = retrieve_documents(topic, user_id=user_id)

        context = build_context(retrieved_docs)

        quiz_generation = generate_quiz(
            topic=topic,
            context=context,
            number_of_questions=number_of_questions,
        )

        try:
            return json.loads(quiz_generation)
        except json.JSONDecodeError:
            raise ValueError("Quiz generation returned invalid JSON")



