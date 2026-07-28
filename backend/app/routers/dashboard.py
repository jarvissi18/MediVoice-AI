from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Patient

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    today = datetime.now(timezone.utc).date()

    total_patients = db.query(Patient).count()

    today_patients = (
        db.query(Patient)
        .filter(func.date(Patient.created_at) == today)
        .count()
    )

    active_cases = total_patients

    return {
        "todayPatients": today_patients,
        "voiceStatus": "Ready",
        "totalPatients": total_patients,
        "activeCases": active_cases,
    }