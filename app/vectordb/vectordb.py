import uuid

try:
    from chromadb import PersistentClient
except ImportError:  # pragma: no cover - optional dependency
    PersistentClient = None


client = PersistentClient() if PersistentClient is not None else None
collection = None
if client is not None:
    collection = client.get_or_create_collection(name="hand_written_base")


def store_vectors(chunks, embedding):
    if collection is None:
        raise RuntimeError("ChromaDB is not available")

    ids = [str(uuid.uuid4()) for _ in chunks]

    documents = [chunk.page_content for chunk in chunks]
    metadatas = [chunk.metadata for chunk in chunks]
    embedding_list = embedding.tolist() if hasattr(embedding, "tolist") else embedding

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embedding_list,
        metadatas=metadatas,
    )

def delete_vectors(user_id: int, filename: str):
    if collection is None:
        raise RuntimeError("ChromaDB is not available")
    
    collection.delete(
        where={
            "$and": [
                {"user_id": str(user_id)},
                {"filename": filename}
            ]
        }
    )