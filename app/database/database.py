from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

import os
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(
    autocommit=False,autoflush=False,bind=engine
)
Base = declarative_base()
def get_db():
    db = sessionLocal()

    try:
        yield db

    finally:
        db.close()