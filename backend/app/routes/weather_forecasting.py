from datetime import date
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException
from app.schema.weather_api import (
    WeatherForecastResponse
)
from app.src.forecast_weather_pipeline import forecast_weather_pipeline


router = APIRouter(prefix="/forecast/weather", tags=["Forecast"])


class WeatherForecastRequest(BaseModel):
    location: str = Field(..., example="New York")
    num_days: int = Field(..., example=3, gt=0, le=7)


@router.post("/", response_model=WeatherForecastResponse)
async def forecast_endpoint(request: WeatherForecastRequest) -> WeatherForecastResponse:
    """
    Forecast weather for a given location.
    """
    try:
        result = await forecast_weather_pipeline(
            location=request.location,
            days=request.num_days
        )
        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))