from sentence_transformers import CrossEncoder
from langchain_core.documents import Document


class RerankerService:

    def __init__(self):
        self.model = CrossEncoder(
            "cross-encoder/ms-marco-MiniLM-L-6-v2"
        )

    def rerank(
        self,
        question: str,
        documents: list[Document],
        top_k: int = 3
    ) -> list[Document]:

        pairs = [
            (question, doc.page_content)
            for doc in documents
        ]

        scores = self.model.predict(pairs)

        ranked = sorted(
            zip(scores, documents),
            key=lambda x: x[0],
            reverse=True
        )

        return [
            doc
            for _, doc in ranked[:top_k]
        ]


reranker = RerankerService()