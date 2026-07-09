from app.services.llm_service import get_llm

def rewrite_query(
        question:str,
        history:str
) -> str:
    if not history.strip():
        return question
    prompt = f"""
You are a query rewriting assistant.

Convert the user's latest question into a complete standalone question.

Use the conversation history only to resolve references like:
- it
- they
- this
- that
- explain more
- continue

Do NOT answer the question.

Return ONLY the rewritten question.

Conversation History:
{history}

Current Question:
{question}
"""
    
    response = get_llm().invoke(prompt)
    return response.content.strip()
