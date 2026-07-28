from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas, models
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# =====================================================
# ADMIN CHECK
# =====================================================

def admin_required(
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "Administrator":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied.",
        )
    return current_user


# =====================================================
# GET ALL USERS
# =====================================================

@router.get(
    "",
    response_model=list[schemas.UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
    _: models.User = Depends(admin_required),
):
    return crud.get_users(db)

# =====================================================
# CREATE RECEPTIONIST
# =====================================================

@router.post(
    "",
    response_model=schemas.UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
    _: models.User = Depends(admin_required),
):
    existing = crud.get_user_by_email(
        db,
        user.email,
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists.",
        )

    allowed_roles = [
        "Receptionist",
        "Doctor",
    ]

    if user.role not in allowed_roles:
        raise HTTPException(
            status_code=400,
            detail="Invalid role.",
        )

    return crud.create_user(
        db,
        user,
    )
    
# =====================================================
# PUT ALL USERS
# =====================================================

@router.put(
    "/{user_id}",
    response_model=schemas.UserResponse,
)
def update_user(
    user_id: int,
    user: schemas.UserUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(admin_required),
):
    updated = crud.update_user(
        db,
        user_id,
        user,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return updated


@router.patch(
    "/{user_id}/status",
    response_model=schemas.UserResponse,
)
def update_status(
    user_id: int,
    status_data: schemas.UserStatusUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(admin_required),
):
    user = crud.update_user_status(
        db,
        user_id,
        status_data.is_active,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


@router.delete(
    "/{user_id}",
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: models.User = Depends(admin_required),
):
    deleted = crud.delete_user(
        db,
        user_id,
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    if deleted == "admin":
        raise HTTPException(
            status_code=400,
            detail="Administrator cannot be deleted.",
        )

    return {
        "message": "User deleted successfully."
    }
    

    
