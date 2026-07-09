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

def generate_quiz(topic: str, context: str, number_of_questions: int = 10) -> str:
    prompt = f"""
You are an expert study assistant.

Generate a multiple-choice quiz about:

Topic:
{topic}

Use ONLY the retrieved context below.

Rules:
- Return ONLY valid JSON.
- Do NOT wrap the JSON inside markdown.
- Do NOT explain anything.
- Do NOT invent information.
- Generate exactly {number_of_questions} questions.
- Each question must have exactly 4 options.
- Only ONE option should be correct.
- Shuffle the correct answer position (don't always make it option A).
- Questions should test understanding, not simple word matching.
- Ignore authors and publication details.

Format:

[
  {{
    "question": "...",
    "options": [
      "...",
      "...",
      "...",
      "..."
    ],
    "answer": "..."
  }}
]

Context:
{context}
"""
    response = get_llm().invoke(prompt)
    return response.content

