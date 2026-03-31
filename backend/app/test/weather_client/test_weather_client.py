import pytest
from unittest.mock import AsyncMock, patch
from app.api.weather_client import WeatherClient
from app.schema.weather_api import LatLon


@pytest.fixture
def client():
    return WeatherClient(api_key="test_key")


# TEST: _request
@pytest.mark.asyncio
async def test_request_success(client):
    mock_response = AsyncMock()

    mock_response.json = lambda: {"key": "value"}
    mock_response.raise_for_status = lambda: None

    client.client.get = AsyncMock(return_value=mock_response)

    result = await client._request("http://test.com", {})

    assert result == {"key": "value"}


# TEST: get_lat_lon (SUCCESS)
@pytest.mark.asyncio
async def test_get_lat_lon_success(client):
    mock_data = {
        "results": [
            {"latitude": 12.97, "longitude": 77.59}
        ]
    }

    with patch.object(client, "_request", AsyncMock(return_value=mock_data)):
        result = await client.get_lat_lon("Bangalore")

    assert isinstance(result, LatLon)
    assert result.latitude == 12.97
    assert result.longitude == 77.59


# TEST: get_lat_lon (FAILURE)
@pytest.mark.asyncio
async def test_get_lat_lon_failure(client):
    mock_data = {"results": []}

    with patch.object(client, "_request", AsyncMock(return_value=mock_data)):
        with pytest.raises(ValueError):
            await client.get_lat_lon("InvalidCity")


# TEST: get_full_current_weather
@pytest.mark.asyncio
async def test_get_full_current_weather(client):
    mock_latlon = LatLon(latitude=12.97, longitude=77.59)

    mock_weather_response = {
        "location": {
            "name": "Bangalore",
            "region": "Karnataka",
            "country": "India"
        },
        "current": {
            "temp_c": 28,
            "feelslike_c": 30,
            "humidity": 60,
            "pressure_mb": 1012,
            "vis_km": 10,
            "wind_kph": 15,
            "wind_degree": 180,
            "wind_dir": "S",
            "condition": {"text": "Sunny"},
            "cloud": 20,
            "uv": 6,
            "precip_mm": 0,
            "air_quality": {
                "pm2_5": 30,
                "pm10": 50,
                "co": 200,
                "no2": 20,
                "o3": 100,
                "so2": 5
            }
        }
    }

    with patch.object(client, "get_lat_lon", AsyncMock(return_value=mock_latlon)), \
         patch.object(client, "_weather_request", AsyncMock(return_value=mock_weather_response)):

        result = await client.get_full_current_weather("Bangalore")

    assert result.location == "Bangalore"
    assert result.temperature_c == 28
    assert result.aqi.pm2_5 == 30


# TEST: get_full_forecast
@pytest.mark.asyncio
async def test_get_full_forecast(client):
    mock_latlon = LatLon(latitude=12.97, longitude=77.59)

    mock_forecast_response = {
        "location": {"name": "Bangalore"},
        "forecast": {
            "forecastday": [
                {
                    "date": "2026-03-30",
                    "day": {
                        "avgtemp_c": 27,
                        "maxtemp_c": 32,
                        "mintemp_c": 22,
                        "totalprecip_mm": 5,
                        "daily_chance_of_rain": "80",
                        "maxwind_kph": 20,
                        "condition": {"text": "Rain"}
                    }
                }
            ]
        }
    }

    with patch.object(client, "get_lat_lon", AsyncMock(return_value=mock_latlon)), \
         patch.object(client, "_weather_request", AsyncMock(return_value=mock_forecast_response)):

        result = await client.get_full_forecast("Bangalore", days=1)

    assert result.location == "Bangalore"
    assert len(result.forecast) == 1
    assert result.forecast[0].will_rain is True