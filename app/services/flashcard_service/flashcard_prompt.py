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


def generate_flashcards(topic:str,context:str) -> str:
    
    
    prompt = f"""
You are an expert study assistant.

Generate study flashcards that explain the academic concepts,
definitions, algorithms, formulas, and important ideas related to:

Topic:
{topic}
Ignore author biographies, acknowledgements,
publisher information, and book metadata unless the topic explicitly asks for them.

Use ONLY the retrieved context below.

Rules:
- Return ONLY a valid JSON array.
- Do NOT wrap the JSON in markdown.
- Do NOT explain anything.
- Do NOT invent information.
- Generate between 10 and 15 flashcards.

Format:

[
  {{
    "question": "...",
    "answer": "..."
  }}
]

Context:
{context}
"""

    response = get_llm().invoke(prompt)
    return response.content


