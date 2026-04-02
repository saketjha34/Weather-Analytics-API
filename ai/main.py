import requests

resp = requests.post(
  "https://weather-analytics-api-production.up.railway.app/forecast/rainfall/",
  json={
    "station_name": "Agumbe",
    "start_date": "2026-03-31",
    "num_days": 5,
  },
)
print(resp.json())