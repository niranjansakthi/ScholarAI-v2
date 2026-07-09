from pydantic import BaseModel


class KeyPointsRequest(BaseModel):
    topic: str


class KeyPointsResponse(BaseModel):
    keypoints: str