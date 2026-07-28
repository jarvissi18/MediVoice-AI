from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.auth.dependencies import get_current_user
from app import models

def admin_required(
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "Administrator":
        raise HTTPException(
            status_code=403,
            detail="Administrator access required."
        )
    return current_user

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


@router.get("/", response_model=schemas.SettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    return crud.get_settings(db)
_: models.User = Depends(admin_required)


@router.put("/", response_model=schemas.SettingsResponse)
def update_settings(
    settings: schemas.SettingsUpdate,
    db: Session = Depends(get_db),
):
    return crud.update_settings(db, settings)
_: models.User = Depends(admin_required)

