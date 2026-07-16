import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load environment variables
load_dotenv()

# PostgreSQL Connection String setup for AegisSOC
# Prioritizes Cloud SQL / external DB URL configurations
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/aegissoc_db"
)

# Convert prisma or connection pool URLs to standard postgresql if necessary
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# SQLAlchemy engine initialization with optimized connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_recycle=1800,
    pool_pre_ping=True,
    echo=False
)

# Create sessionmaker for local transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative Base for ORM Models
Base = declarative_base()

def get_db():
    """
    FastAPI dependency yielding a database session and ensuring 
    proper connection closure after transaction completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
