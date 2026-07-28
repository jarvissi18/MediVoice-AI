from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr

# ==========================================
# PATIENT
# ==========================================

class PatientBase(BaseModel):
    name: str
    age: int
    gender: str
    village: str
    disease: str
    mobile: str


class PatientCreate(PatientBase):
    pass


class PatientUpdate(PatientBase):
    pass


class PatientResponse(PatientBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# SETTINGS
# ==========================================

class SettingsBase(BaseModel):
    hospital_name: str
    hospital_address: str
    hospital_phone: str
    hospital_email: str

    admin_name: str
    admin_email: str
    admin_phone: str
    admin_role: str

    voice_language: str
    voice_timeout: int
    voice_confidence: int


class SettingsUpdate(SettingsBase):
    pass


class SettingsResponse(SettingsBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# USERS
# ==========================================

class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    role: str = "Receptionist"


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    is_active: str

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


# ==========================================
# USER UPDATE (Admin)
# ==========================================

class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr


class UserStatusUpdate(BaseModel):
    is_active: str


# ==========================================
# PROFILE
# ==========================================

class ProfileUpdate(BaseModel):
    full_name: str
    email: EmailStr


class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: str

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# CHANGE PASSWORD
# ==========================================

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str