from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas
from app.auth.security import create_access_token
from app.auth.dependencies import get_current_user
from app import models

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

# ==========================================
# LOGIN
# ==========================================

@router.post(
    "/login",
    response_model=schemas.LoginResponse,
)
def login(
    credentials: schemas.UserLogin,
    db: Session = Depends(get_db),
):
    user = crud.authenticate_user(
        db,
        credentials.email,
        credentials.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(
        data={
            "sub": user.email,
            "role": user.role,
            "id": user.id,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user,
    }


# ==========================================
# REGISTER
# ==========================================

@router.post(
    "/register",
    response_model=schemas.UserResponse,
)
def register(
    user: schemas.UserCreate,
    db: Session = Depends(get_db),
):
    existing = crud.get_user_by_email(
        db,
        user.email,
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    return crud.create_user(
        db,
        user,
    )


# ==========================================
# CURRENT USER
# ==========================================

@router.get(
    "/me",
    response_model=schemas.ProfileResponse,
)
def me(
    current_user: models.User = Depends(get_current_user),
):
    return current_user


# ==========================================
# UPDATE PROFILE
# ==========================================

@router.put(
    "/profile",
    response_model=schemas.ProfileResponse,
)
def update_profile(
    profile: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    updated = crud.update_profile(
        db,
        current_user.id,
        profile,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    if updated == "email_exists":
        raise HTTPException(
            status_code=400,
            detail="Email already exists.",
        )

    return updated


# ==========================================
# CHANGE PASSWORD
# ==========================================

@router.put("/change-password")
def change_password(
    password_data: schemas.ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    result = crud.change_password(
        db,
        current_user.id,
        password_data,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    if result == "wrong_password":
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect.",
        )

    if result == "password_mismatch":
        raise HTTPException(
            status_code=400,
            detail="New passwords do not match.",
        )

    return {
        "message": "Password changed successfully."
    }