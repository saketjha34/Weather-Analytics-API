export interface AQIResponse {
  pm2_5?: number;
  pm10?: number;
  co?: number;
  no2?: number;
  o3?: number;
  so2?: number;
}

export interface CurrentWeatherResponse {
  location: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  temperature_c: number;
  feels_like_c: number;
  humidity: number;
  pressure_mb: number;
  visibility_km: number;
  wind_kph: number;
  wind_degree: number;
  wind_direction: string;
  condition: string;
  cloud: number;
  uv: number;
  precip_mm: number;
  is_raining: boolean;
  aqi: AQIResponse;
}

export interface RainfallPrediction {
  date_of_record: string;
  predicted_rainfall: number;
}

export interface RainfallForecastResponse {
  station_name: string;
  start_date: string;
  num_days: number;
  predictions: RainfallPrediction[];
}

export interface RainfallForecastRequest {
  station_name: string;
  start_date: string;
  num_days: number;
}

export interface WeatherForecastDay {
  date: string;
  avg_temp_c: number;
  max_temp_c: number;
  min_temp_c: number;
  total_precip_mm: number;
  rain_probability: number;
  will_rain: boolean;
  max_wind_kph: number;
  condition: string;
}

export interface WeatherForecastResponse {
  location: string;
  lat: number;
  lon: number;
  forecast: WeatherForecastDay[];
}

export interface WeatherForecastRequest {
  location: string;
  num_days: number;
}
