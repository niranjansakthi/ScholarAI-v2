from langchain_core.documents import Document
from langchain_community.retrievers import BM25Retriever

from app.vectordb.vectordb import collection
from app.services.embedding_service import generate_query_embedding
from app.services.ranker_service import reranker


def retrieve_documents(
    question: str,
    user_id: int,
    n_results: int = 5,
) -> list[Document]:

    all_docs = collection.get(
        where={
            "user_id": str(user_id)
        }
    )

    texts = all_docs["documents"]
    metadatas = all_docs["metadatas"]

    if not texts:
        return []

    bm25 = BM25Retriever.from_texts(
        texts,
        metadatas=metadatas,
    )

    bm25.k = n_results

    bm25_docs = bm25.invoke(question)

    query_embedding = generate_query_embedding(question)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where={
            "user_id": str(user_id)
        },
    )

    documents = []

    for document, metadata in zip(
        results["documents"][0],
        results["metadatas"][0],
    ):
        documents.append(
            Document(
                page_content=document,
                metadata=metadata,
            )
        )

    documents.extend(bm25_docs)

    unique = {}

    for doc in documents:
        unique[doc.page_content] = doc

    documents = list(unique.values())

    documents = reranker.rerank(
        question=question,
        documents=documents,
        top_k=n_results,
    )

    return documents