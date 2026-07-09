from app.services.retrieval_service import retrieve_documents
from app.services.context_builder import build_context
from app.services.flashcard_service.flashcard_prompt import generate_flashcards

import json

class FlashcardService:

    def generate(self, topic: str, user_id: int) -> list:

        retrieved_docs = retrieve_documents(topic, user_id=user_id)

        context = build_context(retrieved_docs)

        flashcards = generate_flashcards(
            topic=topic,
            context=context
        )

        # generate_flashcards returns a JSON string; parse it to a Python list
        return json.loads(flashcards)