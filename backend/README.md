# Weather Analytics Backend API

A production-ready **FastAPI-based backend** for:

*  Rainfall Forecasting (ML-based)
*  Current Weather + AQI
*  Weather Forecast Analytics

Built with a scalable architecture, async APIs, and Docker deployment support.


# Tech Stack

| Category          | Technology              |
| ----------------- | ----------------------- |
| Backend Framework | FastAPI                 |
| Language          | Python 3.11             |
| Async HTTP Client | httpx                   |
| Data Validation   | Pydantic                |
| ML Models         | Scikit-learn / CatBoost |
| API Docs          | Swagger (OpenAPI)       |
| Deployment        | Docker + Railway        |
| Testing           | Pytest                  |


# Project Structure

```
backend/
│
├── app/
│   ├── api/                # External API clients
│   ├── core/               # Config & environment
│   ├── routes/             # FastAPI route handlers
│   ├── schema/             # Pydantic models
│   ├── src/                # Pipelines (business logic)
│   ├── tests/              # Unit tests
│   └── main.py             # Entry point
│
├── requirements.txt
├── Dockerfile
└── README.md
```


# 🌐 API Overview

## 🔹 Base URL

```
https://weather-analytics-api-production.up.railway.app/
```


# 📡 Available APIs

## 1 Current Weather API

### Endpoint

```
POST /weather/current
```

### Description

Fetch current weather including AQI for a given location.

### Request Body

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| location | string | City name   |

### Example

```json
{
  "location": "Bangalore"
}
```


### Response

| Field         | Type   | Description       |
| ------------- | ------ | ----------------- |
| location      | string | City name         |
| temperature_c | float  | Temperature       |
| humidity      | int    | Humidity %        |
| wind_kph      | float  | Wind speed        |
| condition     | string | Weather condition |
| precip_mm     | float  | Rainfall          |
| is_raining    | bool   | Rain flag         |
| aqi           | object | Air quality data  |


## 2 Weather Forecast API

### Endpoint

```
POST /forecast/weather
```

### Description

Get weather forecast for N days.

### Request Body

| Field    | Type   | Constraints   |
| -------- | ------ | ------------- |
| location | string | Required      |
| num_days | int    | 1 ≤ value ≤ 7 |


### Response

| Field    | Type   | Description    |
| -------- | ------ | -------------- |
| location | string | City           |
| lat      | float  | Latitude       |
| lon      | float  | Longitude      |
| forecast | list   | Daily forecast |


### Forecast Object

| Field            | Type   | Description     |
| ---------------- | ------ | --------------- |
| date             | string | YYYY-MM-DD      |
| avg_temp_c       | float  | Avg temperature |
| max_temp_c       | float  | Max temperature |
| min_temp_c       | float  | Min temperature |
| total_precip_mm  | float  | Rainfall        |
| rain_probability | int    | 0–100           |
| will_rain        | bool   | Rain flag       |
| max_wind_kph     | float  | Wind speed      |
| condition        | string | Weather         |


## 3️ Rainfall Forecast (ML)

### Endpoint

```
POST /forecast/rainfall
```

### Description

Predict rainfall using ML model.

### Request Body

| Field        | Type   | Description     |
| ------------ | ------ | --------------- |
| station_name | string | Weather station |
| start_date   | date   | Start date      |
| num_days     | int    | Number of days  |


### Response

| Field        | Type   | Description          |
| ------------ | ------ | -------------------- |
| station_name | string | Station              |
| start_date   | string | Date                 |
| num_days     | int    | Days                 |
| predictions  | list   | Rainfall predictions |


#  Data Validation

* All inputs validated using **Pydantic**
* Strict type enforcement
* Range constraints (e.g., `num_days ≤ 7`)
* Automatic request validation errors (422)

# Running Locally (pip + venv)

## 1 Navigate to backend

```bash
cd backend
```


## 2 Create virtual environment

```bash
python -m venv .venv
```

## 3 Activate environment

### Windows:

```bash
.venv\Scripts\activate
```

### Mac/Linux:

```bash
source .venv/bin/activate
```


## 4 Install dependencies

```bash
pip install -r requirements.txt
```


## 5 Run server

```bash
uvicorn app.main:app --reload
```


## 6 Open API Docs

```
http://localhost:8000/docs
```

# Running with Docker

## 1️ Navigate

```bash
cd backend
```


## 2️ Build image

```bash
docker compose up --build
```


## 3 Down and remove containers

```bash
docker compose down
```
To also remove volumes (e.g., for a clean slate):
```bash
docker compose down -v
```

## 4 Open

```
http://localhost:8000/docs
```


#  Running Tests

## Navigate to tests

```bash
cd app/test
```

## Run tests

```bash
pytest -v
```

or 

## Run using docker
```bash
docker compose run tests
```

## What is tested

* Weather API client
* Forecast pipelines
* Pydantic schema validation
* Error handling


# Environment Variables

Create `.env` file inside `backend/`:

```env
WEATHER_API_KEY=your_api_key_here
```


# 🔐 CORS Configuration

Configured to allow frontend access:

```python
allow_origins=["*"]
```


# 🚀 Deployment

* Backend: Railway (Docker)
* Frontend: Vercel