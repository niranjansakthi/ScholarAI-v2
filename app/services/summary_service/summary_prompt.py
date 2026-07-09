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

def generate_summary(topic:str,context:str) -> str:
    prompt = f"""You are an expert study assistant.

Generate a concise study summary about:

Topic:
{topic}

Use ONLY the provided context.

Rules:

- Do not invent information.
- Do not use outside knowledge.
- Keep the summary between 200 and 400 words.
- Use markdown headings.
- Use bullet points where appropriate.
- Explain the concepts clearly.
- Focus on the important ideas.

Context:
{context}
"""

    response = get_llm().invoke(prompt)

    return response.content