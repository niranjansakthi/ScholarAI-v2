import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq



load_dotenv()

_llm = None


def get_llm():
    global _llm
    if _llm is None:
        api_key = os.getenv("GROQ_API_KEY") or "dummy"
        _llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            groq_api_key=api_key,
        )
    return _llm


def generate_rag_response(context: str, question: str, history: str = "") -> str:
    history_section = f"\nConversation History:\n{history}\n" if history else ""
    
    prompt = f"""
YYou are an AI study assistant.

Use BOTH the retrieved context and the previous conversation to answer.

Rules:
- Use the retrieved context as the primary source.
- Use the conversation history to understand follow-up questions like "it", "that", "explain more", etc.
- If the retrieved context does not contain the answer, reply:
"I couldn't find that information in the uploaded study materials."
- Do not invent information.

Conversation History:
{history}

Retrieved Context:
{context}

Current Question:
{question}
"""

    response = get_llm().invoke(prompt)
    return response.content


def generate_llm_response(question: str, context: str, history: str = "") -> str:
    return generate_rag_response(context=context, question=question, history=history)