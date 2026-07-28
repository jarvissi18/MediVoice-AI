from sqlalchemy.orm import Session

from app import models, schemas

from app.auth.security import (
    hash_password,
    verify_password,
)

# =====================================================
# PATIENT CRUD
# =====================================================

def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(**patient.model_dump())

    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)

    return db_patient


def get_patients(db: Session):
    return db.query(models.Patient).order_by(models.Patient.id.desc()).all()


def get_patient(db: Session, patient_id: int):
    return (
        db.query(models.Patient)
        .filter(models.Patient.id == patient_id)
        .first()
    )


def update_patient(db: Session, patient_id: int, patient: schemas.PatientUpdate):
    db_patient = get_patient(db, patient_id)

    if not db_patient:
        return None

    for key, value in patient.model_dump().items():
        setattr(db_patient, key, value)

    db.commit()
    db.refresh(db_patient)

    return db_patient


def delete_patient(db: Session, patient_id: int):
    db_patient = get_patient(db, patient_id)

    if not db_patient:
        return None

    db.delete(db_patient)
    db.commit()

    return db_patient


# =====================================================
# SETTINGS CRUD
# =====================================================

def get_settings(db: Session):
    """
    Returns the single settings record.
    If it doesn't exist, create one with default values.
    """

    settings = db.query(models.Settings).first()

    if not settings:
        settings = models.Settings()
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


def update_settings(db: Session, settings_data: schemas.SettingsUpdate):
    """
    Update the application settings.
    """

    settings = get_settings(db)

    for key, value in settings_data.model_dump().items():
        setattr(settings, key, value)

    db.commit()
    db.refresh(settings)

    return settings

# =====================================================
# USER CRUD
# =====================================================

def get_user_by_email(
    db: Session,
    email: str,
):
    return (
        db.query(models.User)
        .filter(models.User.email == email)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int,
):
    return (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )


def get_users(db: Session):
    return (
        db.query(models.User)
        .order_by(models.User.id)
        .all()
    )


def create_user(
    db: Session,
    user: schemas.UserCreate,
):
    existing = get_user_by_email(
        db,
        user.email,
    )

    if existing:
        return None

    db_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(
            user.password
        ),
        role=user.role,
        is_active="true",
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
):
    user = get_user_by_email(
        db,
        email,
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash,
    ):
        return None

    return user


def delete_user(
    db: Session,
    user_id: int,
):
    user = get_user_by_id(
        db,
        user_id,
    )

    if not user:
        return None
    
    if user.role == "Administrator":
        return "admin"

    db.delete(user)

    db.commit()

    return user


def update_user(
    db: Session,
    user_id: int,
    user_data: schemas.UserUpdate,
):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    user.full_name = user_data.full_name
    user.email = user_data.email

    db.commit()
    db.refresh(user)

    return user

def update_user_status(
    db: Session,
    user_id: int,
    is_active: str,
):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    user.is_active = is_active

    db.commit()
    db.refresh(user)

    return user

# =====================================================
# PROFILE CRUD
# =====================================================

def update_profile(
    db: Session,
    user_id: int,
    profile_data: schemas.ProfileUpdate,
):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    # Email already exists?
    existing = (
        db.query(models.User)
        .filter(
            models.User.email == profile_data.email,
            models.User.id != user_id,
        )
        .first()
    )

    if existing:
        return "email_exists"

    user.full_name = profile_data.full_name
    user.email = profile_data.email

    db.commit()
    db.refresh(user)

    return user


# =====================================================
# CHANGE PASSWORD
# =====================================================

def change_password(
    db: Session,
    user_id: int,
    password_data: schemas.ChangePasswordRequest,
):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    # Verify current password
    if not verify_password(
        password_data.current_password,
        user.password_hash,
    ):
        return "wrong_password"

    # Confirm password
    if (
        password_data.new_password
        != password_data.confirm_password
    ):
        return "password_mismatch"

    # Update password
    user.password_hash = hash_password(
        password_data.new_password
    )

    db.commit()
    db.refresh(user)

    return user


# =====================================================
# GET PROFILE
# =====================================================

def get_profile(
    db: Session,
    user_id: int,
):
    return get_user_by_id(db, user_id)