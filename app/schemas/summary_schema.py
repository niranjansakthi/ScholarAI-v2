from pydantic import BaseModel


class SummaryRequest(BaseModel):
    topic: str


class SummaryResponse(BaseModel):
    summary: str