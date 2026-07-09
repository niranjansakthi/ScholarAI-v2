from langchain_core.documents import Document

def build_context(
        retrieved_docs:list[Document]

) ->str:
    contexts = []

    for i,doc in enumerate(retrieved_docs,start=1):
        source = doc.metadata.get("source","unknown")
        page = doc.metadata.get("page","-")

        contexts.append(
            f"""
Source {i}
Source File : {source}
Page : {page}

Content:
{doc.page_content}
"""
        )
    return "\n\n".join(contexts)