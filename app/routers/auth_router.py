from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.auth_service import AuthService
from app.schemas.auth_schema import SignupRequest, MessageResponse, TokenResponse

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/signup",
    response_model=MessageResponse,
)
def signup(
    request: SignupRequest,
    db: Session = Depends(get_db),
):

    auth_service = AuthService(db)

    try:
        auth_service.signup(
            username=request.username,
            email=request.email,
            password=request.password,
        )

        return MessageResponse(
            message="User created successfully"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    auth_service = AuthService(db)

    try:

        token = auth_service.login(
            email=request.username,
            password=request.password,
        )

        return TokenResponse(
            access_token=token
        )

    except ValueError as e:

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )