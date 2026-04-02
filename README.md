# 🌦️ Weather Analytics Platform

A full-stack application for **Weather Intelligence & Rainfall Prediction**, combining:

* 🌤️ Real-time Weather + AQI data
* 📊 Weather Forecast Analytics (visual dashboards)
* 🌧️ ML-based Rainfall Prediction

Built with modern, scalable technologies using **FastAPI + React (Vite + TypeScript)**.


# 🚀 Tech Stack

## 🔹 Backend

* FastAPI (Python 3.11)
* Pydantic (data validation)
* httpx (async API calls)
* ML models (CatBoost / Scikit-learn)
* Docker (containerization)
* Railway (deployment)

## 🔹 Frontend

* React + TypeScript
* Vite (fast bundler)
* TailwindCSS (UI styling)
* Recharts / Plotly (analytics charts)
* Vercel (deployment)


# 📂 Project Structure

```id="projstruct"
root/
│
├── backend/              # FastAPI backend
│   ├── app/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/             # React frontend (Vite + TS)
│   ├── src/
│   └── package.json
│
└── README.md
```


# 🌐 Features

* 🔍 Search weather by location
* 🌫️ Air Quality Index (AQI) integration
* 📅 Multi-day weather forecast
* 📊 Interactive analytics dashboard (charts)
* 🌧️ ML-based rainfall prediction
* ⚡ Fast async backend APIs
* 🎯 Clean UI with modern UX


# 📡 Backend API Routes


## 1️⃣ Current Weather

```id="cw"
POST /weather/current
```

**Input**

```json
{
  "location": "Bangalore"
}
```

**Output (key fields)**

| Field         | Description         |
| ------------- | ------------------- |
| temperature_c | Temperature         |
| humidity      | Humidity %          |
| wind_kph      | Wind speed          |
| condition     | Weather condition   |
| precip_mm     | Rainfall            |
| is_raining    | Boolean             |
| aqi           | Air quality metrics |


## 2️⃣ Weather Forecast

```id="wf"
POST /forecast/weather
```

**Input**

```json
{
  "location": "Delhi",
  "num_days": 3
}
```

**Output**

* Daily forecast data (temperature, rainfall, wind, condition)


## 3️⃣ Rainfall Prediction (ML)

```id="rf"
POST /forecast/rainfall
```

**Input**

```json
{
  "station_name": "Belgaum",
  "start_date": "2026-05-01",
  "num_days": 2
}
```

**Output**

* Predicted rainfall values

# 🧪 Backend Setup (Local)

## 1️⃣ Navigate

```bash id="b1"
cd backend
```


## 2️⃣ Create virtual environment

```bash id="b2"
python -m venv .venv
```

### Activate

**Windows**

```bash id="b3"
.venv\Scripts\activate
```

**Mac/Linux**

```bash id="b4"
source .venv/bin/activate
```


## 3️⃣ Install dependencies

```bash id="b5"
pip install -r requirements.txt
```


## 4️⃣ Run server

```bash id="b6"
uvicorn app.main:app --reload
```


## 5️⃣ Open API Docs

```id="b7"
http://localhost:8000/docs
```


# 🐳 Backend via Docker

```bash id="d1"
cd backend
docker build -t weather-api .
docker run -p 8000:8000 weather-api
```


# 🧪 Run Tests

```bash id="t1"
cd backend/app/tests
pytest -v
```


# 💻 Frontend Setup

## 1️⃣ Navigate

```bash id="f1"
cd frontend
```


## 2️⃣ Install dependencies

```bash id="f2"
npm install
```


## 3️⃣ Run dev server

```bash id="f3"
npm run dev
```


## 4️⃣ Open app

```id="f4"
http://localhost:5173
```


# ⚙️ Environment Variables

## Frontend (.env)

```env id="envf"
VITE_API_BASE_URL=https://localhost:8000
```

---

## Backend (.env)

```env id="envb"
WEATHER_API_KEY=your_api_key
```


# 🔗 Connecting Frontend & Backend

Frontend uses:

```ts id="conn"
import.meta.env.VITE_API_BASE_URL
```

All API calls are routed through this base URL.


# 🚀 Deployment

| Service  | Platform |
| -------- | -------- |
| Backend  | Railway  |
| Frontend | Vercel   |

# 📊 UI Highlights

* 📈 Forecast charts (temperature, rainfall, wind)
* 🎛️ Segmented controls for days selection
* 📍 Location dropdown from dataset
* 🌙 Clean modern UI (TailwindCSS)