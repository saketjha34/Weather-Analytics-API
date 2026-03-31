import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeftRight, Download } from "lucide-react";
import JSZip from "jszip";
import ForecastForm from "../components/forecast/ForecastForm";
import ForecastCharts from "../components/forecast/ForecastCharts";
import ForecastDayCard from "../components/forecast/ForecastDayCard";
import MetricSummary from "../components/forecast/MetricSummary";
import WeatherSummaryCard from "../components/forecast/WeatherSummaryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import {
  WeatherForecastDay,
  WeatherForecastRequest,
  WeatherForecastResponse,
} from "../types";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

const toFahrenheit = (value: number) => (value * 9) / 5 + 32;

const WeatherForecast = () => {
  const [forecast, setForecast] = useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const handleSubmit = async (location: string, numDays: number) => {
    const payload: WeatherForecastRequest = {
      location,
      num_days: numDays,
    };

    setLoading(true);
    setError(null);
    setForecast(null);

    try {
      const response = await fetch(`${API_BASE}/forecast/weather/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Forecast request failed (${response.status}).`);
      }

      const data = (await response.json()) as WeatherForecastResponse;
      if (!data.forecast?.length) {
        setError("No forecast data returned for the selected range.");
      }
      setForecast(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch forecast data.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForecast(null);
    setError(null);
  };

  const chartData = useMemo(() => {
    if (!forecast) {
      return [] as WeatherForecastDay[];
    }

    return forecast.forecast.map((day) => ({
      ...day,
      avg_temp_c: useFahrenheit ? toFahrenheit(day.avg_temp_c) : day.avg_temp_c,
      max_temp_c: useFahrenheit ? toFahrenheit(day.max_temp_c) : day.max_temp_c,
      min_temp_c: useFahrenheit ? toFahrenheit(day.min_temp_c) : day.min_temp_c,
    }));
  }, [forecast, useFahrenheit]);

  const metrics = useMemo(() => {
    if (!chartData.length) {
      return null;
    }

    const avgTemp =
      chartData.reduce((sum, day) => sum + day.avg_temp_c, 0) / chartData.length;
    const maxTemp = Math.max(...chartData.map((day) => day.max_temp_c));
    const minTemp = Math.min(...chartData.map((day) => day.min_temp_c));
    const totalRain = chartData.reduce((sum, day) => sum + day.total_precip_mm, 0);
    const avgRainProbability =
      chartData.reduce((sum, day) => sum + day.rain_probability, 0) /
      chartData.length;
    const maxWind = Math.max(...chartData.map((day) => day.max_wind_kph));

    return { avgTemp, maxTemp, minTemp, totalRain, avgRainProbability, maxWind };
  }, [chartData]);

  const unitLabel = useFahrenheit ? "°F" : "°C";

  const buildCsv = (rows: Array<Array<string | number>>) =>
    rows.map((row) => row.join(",")).join("\n");

  const handleDownloadCsv = () => {
    if (!forecast) {
      return;
    }

    const rows = [
      ["date", `avg_temp_${unitLabel}`, `max_temp_${unitLabel}`, `min_temp_${unitLabel}`, "total_precip_mm", "rain_probability", "max_wind_kph", "condition"],
      ...chartData.map((day) => [
        day.date,
        day.avg_temp_c.toFixed(1),
        day.max_temp_c.toFixed(1),
        day.min_temp_c.toFixed(1),
        day.total_precip_mm,
        day.rain_probability,
        day.max_wind_kph,
        day.condition,
      ]),
    ];

    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `weather-forecast-${forecast.location}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (!forecast || !metrics) {
      return;
    }

    const payload = {
      unit: unitLabel,
      summary: {
        location: forecast.location,
        lat: forecast.lat,
        lon: forecast.lon,
      },
      metrics,
      forecast: chartData,
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `weather-forecast-${forecast.location}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    if (!forecast || !metrics) {
      return;
    }

    setDownloadingZip(true);
    try {
      const zip = new JSZip();
      const summary = {
        unit: unitLabel,
        location: forecast.location,
        lat: forecast.lat,
        lon: forecast.lon,
        metrics,
      };

      const csvRows = [
        ["date", `avg_temp_${unitLabel}`, `max_temp_${unitLabel}`, `min_temp_${unitLabel}`, "total_precip_mm", "rain_probability", "max_wind_kph", "condition"],
        ...chartData.map((day) => [
          day.date,
          day.avg_temp_c.toFixed(1),
          day.max_temp_c.toFixed(1),
          day.min_temp_c.toFixed(1),
          day.total_precip_mm,
          day.rain_probability,
          day.max_wind_kph,
          day.condition,
        ]),
      ];

      zip.file("summary.json", JSON.stringify(summary, null, 2));
      zip.file("forecast.json", JSON.stringify(chartData, null, 2));
      zip.file("forecast.csv", buildCsv(csvRows));

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `weather-forecast-${forecast.location}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <section className="space-y-6">
      <ForecastForm loading={loading} onSubmit={handleSubmit} onReset={handleReset} />

      {loading && <LoadingSpinner />}

      {error && (
        <Card className="flex items-center gap-2 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4" /> {error}
        </Card>
      )}

      {!loading && !forecast && !error && (
        <Card className="text-center text-sm text-slate-500">
          Select a location to view forecast analytics.
        </Card>
      )}

      {forecast && metrics && (
        <div className="space-y-6">
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Download insights</p>
              <p className="text-xs text-slate-500">
                Export the analytics dataset in CSV, JSON, or a bundled ZIP.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={handleDownloadCsv}>
                <Download className="h-4 w-4" /> CSV
              </Button>
              <Button variant="secondary" onClick={handleDownloadJson}>
                <Download className="h-4 w-4" /> JSON
              </Button>
              <Button variant="secondary" onClick={handleDownloadZip} disabled={downloadingZip}>
                <Download className="h-4 w-4" /> {downloadingZip ? "Preparing..." : "ZIP"}
              </Button>
            </div>
          </Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <WeatherSummaryCard
              location={forecast.location}
              lat={forecast.lat}
              lon={forecast.lon}
            />
            <Button variant="secondary" onClick={() => setUseFahrenheit((prev) => !prev)}>
              <ArrowLeftRight className="h-4 w-4" /> Toggle {unitLabel}
            </Button>
          </div>

          <MetricSummary
            avgTemp={metrics.avgTemp}
            maxTemp={metrics.maxTemp}
            minTemp={metrics.minTemp}
            totalRain={metrics.totalRain}
            avgRainProbability={metrics.avgRainProbability}
            maxWind={metrics.maxWind}
            unitLabel={unitLabel}
          />

          <ForecastCharts data={chartData} unitLabel={unitLabel} />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Daily Forecast</h3>
            {chartData.map((day) => (
              <ForecastDayCard key={day.date} day={day} unitLabel={unitLabel} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default WeatherForecast;
