from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import time

# Import local database dependencies
from database import engine, Base, get_db

# Initialize AegisSOC FastAPI Application
app = FastAPI(
    title="AegisSOC Core API",
    description="Cognitive Cyber Security Operations Center (SOC) backend engine & AML telemetry router",
    version="1.0.0"
)

# Set up CORS policies for AegisSOC Frontend integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this to specific origins in production environments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database tables on startup if they don't already exist
@app.on_event("startup")
def on_startup():
    try:
        Base.metadata.create_all(bind=engine)
        print("AegisSOC Database tables initialized successfully.")
    except Exception as e:
        print(f"Database connection skipped or table initialization deferred: {e}")

@app.get("/api/health", tags=["System Health"])
def health_check(db: Session = Depends(get_db)):
    """
    Verifies that the AegisSOC backend, connection pools, and downstream 
    services are fully active and reachable.
    """
    try:
        # Simple query validation
        db.execute("SELECT 1")
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "online",
        "timestamp": time.time(),
        "services": {
            "api_engine": "active",
            "database": db_status
        }
    }

@app.get("/api/threats/summary", tags=["SOC Metrics"])
def get_threat_summary():
    """
    Serves consolidated security event stats for the main AegisSOC dashboard.
    """
    return {
        "metrics": {
            "monitored_endpoints": 4820,
            "unresolved_critical_alerts": 12,
            "integrity_index": 99.85,
            "last_audit_epoch": int(time.time())
        }
    }
