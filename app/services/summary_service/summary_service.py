import json
from app.services.summary_service.summary_prompt import generate_summary


from app.services.retrieval_service import retrieve_documents
from app.services.context_builder import build_context


class SummaryService:
    def generate(self,topic:str, user_id: int):

        retrieved_docs = retrieve_documents(topic, user_id=user_id)

        context = build_context(retrieved_docs)

        summary = generate_summary(
            topic=topic,
            context=context
        )

        return summary