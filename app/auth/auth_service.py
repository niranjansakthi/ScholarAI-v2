from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.user import User
from app.auth.password import hash_password,verify_password
from app.auth.jwt_handler import create_access_token

class AuthService:

    def __init__(self, db: Session):
        self.db = db

    def signup(
        self,
        username: str,
        email: str,
        password: str,
    ):
        # 1. Check if email already exists
        existing_user = (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

        if existing_user:
            raise ValueError("Email already registered")

        # 2. Hash password
        hashed_password = hash_password(password)

        # 3. Create user
        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password,
        )



        # 4. Save to database
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user
    
    def login(
    self,
    email: str,
    password: str,):

        user = (
            self.db.query(User)
            .filter(or_(User.email == email, User.username == email))
            .first()
        )

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(
            password,
            user.hashed_password,
        ):
            raise ValueError("Invalid email or password")

        token = create_access_token(str(user.id))

        return token