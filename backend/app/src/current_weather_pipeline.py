from app.api.weather_client import WeatherClient
from app.core.load_env import get_settings
from app.schema.weather_api import CurrentWeather

settings = get_settings()

async def current_weather_pipeline(location: str) -> CurrentWeather:
    """
    Pipeline to fetch current weather for a given location.

    This function:
    - Initializes the WeatherClient using environment settings
    - Calls the current weather API
    - Returns validated CurrentWeather schema

    Args:
        location (str): Name of the city or station

    Returns:
        CurrentWeather: Structured and validated weather data
    """
    client = WeatherClient(api_key=settings.WEATHER_API_KEY)

    try:
        weather: CurrentWeather = await client.get_full_current_weather(location)
        return weather
    finally:
        await client.close()