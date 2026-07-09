from fastapi import APIRouter, Depends

from app.schemas.keypoints_schema import (
    KeyPointsRequest,
    KeyPointsResponse
)

from app.services.keypoint_service.keypoint_service import KeyPointsService
from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/keypoints",
    tags=["Key Points"]
)

keypoints_service = KeyPointsService()


@router.post("/", response_model=KeyPointsResponse)
async def generate_keypoints(request: KeyPointsRequest, current_user: User = Depends(get_current_user)):

    keypoints = keypoints_service.generate(request.topic, user_id=current_user.id)

    return KeyPointsResponse(
        keypoints=keypoints
    )