from app.services.retrieval_service import retrieve_documents
from app.services.context_builder import build_context

from app.services.keypoint_service.keypoint_prompt import generate_keypoints


class KeyPointsService:

    def generate(self, topic: str, user_id: int):

        retrieved_docs = retrieve_documents(topic, user_id=user_id)

        context = build_context(retrieved_docs)

        return generate_keypoints(
            topic=topic,
            context=context
        )