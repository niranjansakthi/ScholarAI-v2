import base64
from pathlib import Path

from openai import OpenAI


class LMStudioService:
    def __init__(self):

        self.client = OpenAI(
            base_url="http://localhost:1234/v1",
            api_key="lm-studio"
        )

        # Change this to the exact model name shown in LM Studio
        self.model = "qwen2.5-vl"

    def encode_image(self, image_path: str | Path):

        image_path = Path(image_path)

        with open(image_path, "rb") as f:
            return base64.b64encode(f.read()).decode("utf-8")

    def extract_text(self, image_path: str | Path) -> str:

        image = self.encode_image(image_path)

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": (
                                "Extract ALL text from this page exactly as written. "
                                "Do not summarize. "
                                "Preserve line breaks where possible."
                            ),
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{image}"
                            },
                        },
                    ],
                }
            ],
            temperature=0,
            max_tokens=2048,
        )

        return response.choices[0].message.content