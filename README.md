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
Weather-Analytics-API/
│
├── ai/                         # (Optional) ML / experimentation code
│
├── backend/                    # FastAPI backend
│   │
│   ├── app/                    # Core application
│   │   ├── api/                # External API clients (weather APIs)
│   │   ├── core/               # Config, env loading, constants
│   │   ├── routes/             # FastAPI route handlers
│   │   ├── schema/             # Pydantic models (validation)
│   │   ├── src/                # Business logic / pipelines
│   │   ├── tests/              # Unit tests (pytest)
│   │   └── main.py             # FastAPI entry point
│   │
│   ├── probers/                # Experimental / debugging scripts
│   ├── .env                    # Backend environment variables
│   ├── .env.sample             # Example env file
│   ├── Dockerfile              # Docker configuration
│   ├── docker-compose.yaml     # Local multi-service setup
│   ├── railway.json            # Railway deployment config
│   ├── requirements.txt        # Python dependencies
│   ├── README.md               # Backend-specific docs
│   │
│   ├── .venv/                  # Virtual environment (ignored)
│   └── .pytest_cache/          # Pytest cache
│
├── frontend/                   # React frontend (Vite + TypeScript)
│   │
│   ├── public/                 # Static assets
│   │   └── location.txt        # City/location dataset
│   │
│   ├── src/                    # Frontend source code
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Pages (Weather, Forecast, Rainfall)
│   │   ├── utils/              # Helpers / API client
│   │   └── main.tsx            # React entry point
│   │
│   ├── .env                    # Frontend env vars (VITE_*)
│   ├── .env.sample             # Example env
│   ├── index.html              # Root HTML
│   ├── package.json            # Dependencies
│   ├── package-lock.json
│   ├── vite.config.ts          # Vite config
│   ├── tsconfig.json           # TypeScript config
│   ├── tsconfig.node.json
│   ├── tailwind.config.cjs     # TailwindCSS config
│   ├── postcss.config.cjs
│   │
│   └── node_modules/           # Installed packages (ignored)
│
├── .gitignore
├── .gitattributes
├── LICENSE
└── README.md                   # Root project documentation
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