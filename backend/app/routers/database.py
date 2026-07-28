from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import get_db
from app import models

router = APIRouter(
    prefix="/database",
    tags=["Database"],
)


@router.get("/status")
def database_status(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))

        total_patients = db.query(models.Patient).count()
        total_settings = db.query(models.Settings).count()

        return {
            "status": "Connected",
            "database": "PostgreSQL",
            "patients": total_patients,
            "settings": total_settings,
            "api": "Running",
        }

    except Exception as e:
        return {
            "status": "Disconnected",
            "database": "Unknown",
            "patients": 0,
            "settings": 0,
            "api": "Stopped",
            "error": str(e),
        }