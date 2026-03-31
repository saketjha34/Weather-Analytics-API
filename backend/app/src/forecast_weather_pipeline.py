from app.api.weather_client import WeatherClient
from app.core.load_env import get_settings
from app.schema.weather_api import WeatherForecastResponse

settings = get_settings()

async def forecast_weather_pipeline(location: str, days: int = 3) -> WeatherForecastResponse:
    """
    Pipeline to fetch forecast weather for a given location.

    This function:
    - Initializes the WeatherClient using environment settings
    - Calls the forecast weather API
    - Returns validated WeatherForecastResponse schema

    Args:
        location (str): Name of the city or station
        days (int): Number of days for the forecast

    Returns:
        WeatherForecastResponse: Structured and validated forecast weather data
    """
    client = WeatherClient(api_key=settings.WEATHER_API_KEY)

    try:
        forecast: WeatherForecastResponse = await client.get_full_forecast(location=location, days=days)
        return forecast
    finally:
        await client.close()