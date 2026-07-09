from sentence_transformers import SentenceTransformer


_model = None


def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("BAAI/bge-small-en-v1.5")
    return _model


def generate_embeddings(document_chunks):
    texts = [chunk.page_content for chunk in document_chunks]
    embeddings = get_model().encode(texts)
    return embeddings


def generate_query_embedding(question: str):
    embedding = get_model().encode(question)
    return embedding.tolist()