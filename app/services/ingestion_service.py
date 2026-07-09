from app.loaders.pdf_loader import load_pdf
from app.loaders.youtube_loader import load_youtube
from app.loaders.handwritten_loader import load_handwritten

from app.services.chunk_service import chunk_documents
from app.services.embedding_service import generate_embeddings
from app.vectordb.vectordb import store_vectors

from app.utility.file_service import file_saver


class IngestionService:

    def _process_documents(
        self,
        docs,
        user_id: int,
        filename: str,
    ):
        document_chunks = chunk_documents(docs)

        for chunk in document_chunks:
            chunk.metadata["user_id"] = str(user_id)
            chunk.metadata["filename"] = filename

        embeddings = generate_embeddings(document_chunks)

        store_vectors(
            document_chunks,
            embeddings,
        )

    async def ingest_pdf(
        self,
        uploaded_file,
        user_id: int,
    ):
        file_path = await file_saver(uploaded_file)
        docs = load_pdf(file_path)

        self._process_documents(
            docs,
            user_id,
            uploaded_file.filename,
        )

    async def ingest_youtube(
        self,
        url: str,
        user_id: int,
    ):
        docs = load_youtube(url)

        self._process_documents(
            docs,
            user_id,
            url,
        )

    async def ingest_handwritten(
        self,
        uploaded_image,
        user_id: int,
    ):
        file_path = await file_saver(uploaded_image)
        docs = load_handwritten(file_path)

        self._process_documents(
            docs,
            user_id,
            uploaded_image.filename,
        )