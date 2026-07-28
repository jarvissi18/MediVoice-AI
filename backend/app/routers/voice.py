from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.gemini_service import parse_patient_voice

router = APIRouter(
    prefix="/voice",
    tags=["Voice AI"]
)


class VoiceRequest(BaseModel):
    transcript: str


@router.post("/parse")
def parse_voice(request: VoiceRequest):
    result = parse_patient_voice(request.transcript)

    return result