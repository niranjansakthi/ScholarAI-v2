from langchain_text_splitters import RecursiveCharacterTextSplitter


# Note: Semantic chunking requires an embedding model
def chunks(docs):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=150)
    chunks = text_splitter.split_documents(docs)
    return chunks


def chunk_documents(docs):
    return chunks(docs)
   