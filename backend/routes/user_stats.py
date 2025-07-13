# backend/user_stats.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class EcoStats(BaseModel):
    totalPoints: int
    productsViewed: int
    co2Saved: float
    averageScore: str

@router.get("/api/user/stats", response_model=EcoStats)
def get_user_stats():
    # You can later replace this with database logic
    return EcoStats(
        totalPoints=69,
        productsViewed=15,
        co2Saved=40,
        averageScore="A+"
    )
