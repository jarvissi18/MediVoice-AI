from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String(20), nullable=False)

    village = Column(String(100), nullable=False)

    disease = Column(String(150), nullable=False)

    mobile = Column(String(15), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )


# ==========================================
# SETTINGS
# ==========================================

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)

    # ==========================
    # Hospital Information
    # ==========================
    hospital_name = Column(String(150), default="MediVoice AI Hospital")
    hospital_address = Column(String(255), default="")
    hospital_phone = Column(String(20), default="")
    hospital_email = Column(String(100), default="")

    # ==========================
    # Admin Profile
    # ==========================
    admin_name = Column(String(100), default="Admin")
    admin_email = Column(String(100), default="admin@medivoice.ai")
    admin_phone = Column(String(20), default="")
    admin_role = Column(String(50), default="Administrator")

    # ==========================
    # Voice AI
    # ==========================
    voice_language = Column(String(30), default="English")
    voice_timeout = Column(Integer, default=5)
    voice_confidence = Column(Integer, default=80)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
    
    
# ==========================================
# USERS
# ==========================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False, index=True)

    password_hash = Column(String(255), nullable=False)

    role = Column(String(30), nullable=False, default="Receptionist")
    # Allowed:
    # Administrator
    # Doctor
    # Receptionist

    is_active = Column(String(10), default="true")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )