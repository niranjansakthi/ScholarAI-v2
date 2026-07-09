from app.services.llm_service import get_llm


def generate_keypoints(topic: str, context: str) -> str:

    prompt = f"""
You are an expert study assistant.

Generate the key points about:

Topic:
{topic}

Use ONLY the provided context.

Rules:

- Do not invent information.
- Do not use outside knowledge.
- Return 10-15 concise bullet points.
- Each point should be one or two sentences.
- Focus on definitions, concepts, facts, formulas, and important ideas.
- Use markdown bullet points.

Context:
{context}
"""

    response = get_llm().invoke(prompt)

    return response.content