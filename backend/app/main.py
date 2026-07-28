from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routers import patients
from app.routers import voice
from app.routers import dashboard
from app.routers import analytics
from app.routers import settings
from app.routers import database
from app.routers import auth
from app.routers import users

# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="MediVoice AI",
    version="1.0.0",
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)
app.include_router(voice.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(settings.router)
app.include_router(database.router)
app.include_router(auth.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {
        "message": "MediVoice AI Backend Running Successfully 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }