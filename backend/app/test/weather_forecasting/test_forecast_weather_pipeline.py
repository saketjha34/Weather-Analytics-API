import os
os.environ["WEATHER_API_KEY"] = "test_key"
import pytest
from unittest.mock import AsyncMock, patch
from app.src.forecast_weather_pipeline import forecast_weather_pipeline
from app.schema.weather_api import WeatherForecastResponse, WeatherForecastDay


@pytest.mark.asyncio
async def test_forecast_weather_pipeline_success():
    """
    Test successful execution of forecast_weather_pipeline.
    """

    mock_forecast = WeatherForecastResponse(
        location="Bangalore",
        lat=12.97,
        lon=77.59,
        forecast=[
            WeatherForecastDay(
                date="2026-03-30",
                avg_temp_c=27.0,
                max_temp_c=32.0,
                min_temp_c=22.0,
                total_precip_mm=5.0,
                rain_probability=80,
                will_rain=True,
                max_wind_kph=20.0,
                condition="Rain"
            )
        ]
    )

    with patch("app.src.forecast_weather_pipeline.WeatherClient") as MockClient:
        mock_instance = MockClient.return_value

        mock_instance.get_full_forecast = AsyncMock(return_value=mock_forecast)
        mock_instance.close = AsyncMock()

        result = await forecast_weather_pipeline("Bangalore", days=1)

        # Assertions
        assert isinstance(result, WeatherForecastResponse)
        assert result.location == "Bangalore"
        assert len(result.forecast) == 1
        assert result.forecast[0].will_rain is True

        mock_instance.get_full_forecast.assert_called_once_with(location="Bangalore", days=1)
        mock_instance.close.assert_called_once()


# TEST: Exception Handling
@pytest.mark.asyncio
async def test_forecast_weather_pipeline_failure():
    """
    Test pipeline when WeatherClient raises an exception.
    """

    with patch("app.src.forecast_weather_pipeline.WeatherClient") as MockClient:
        mock_instance = MockClient.return_value

        mock_instance.get_full_forecast = AsyncMock(
            side_effect=ValueError("Invalid location")
        )
        mock_instance.close = AsyncMock()

        with pytest.raises(ValueError):
            await forecast_weather_pipeline("InvalidCity", days=3)

        mock_instance.close.assert_called_once()


# TEST: Schema Validation
@pytest.mark.asyncio
async def test_forecast_weather_pipeline_schema_validation():
    """
    Ensure returned object strictly follows Pydantic schema.
    """

    mock_forecast = WeatherForecastResponse(
        location="Delhi",
        lat=28.61,
        lon=77.20,
        forecast=[
            WeatherForecastDay(
                date="2026-04-01",
                avg_temp_c=35.0,
                max_temp_c=40.0,
                min_temp_c=30.0,
                total_precip_mm=0.0,
                rain_probability=10,
                will_rain=False,
                max_wind_kph=12.0,
                condition="Hot"
            )
        ]
    )

    with patch("app.src.forecast_weather_pipeline.WeatherClient") as MockClient:
        mock_instance = MockClient.return_value

        mock_instance.get_full_forecast = AsyncMock(return_value=mock_forecast)
        mock_instance.close = AsyncMock()

        result = await forecast_weather_pipeline("Delhi", days=1)

        # Pydantic validation
        validated = WeatherForecastResponse.model_validate(result)

        assert validated.location == "Delhi"
        assert validated.forecast[0].avg_temp_c == 35.0
        assert validated.forecast[0].will_rain is False