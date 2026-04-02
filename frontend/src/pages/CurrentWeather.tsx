import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CloudRain,
  CloudSun,
  Compass,
  Download,
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import JSZip from "jszip";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";
import SectionCard from "../components/SectionCard";
import MetricCard from "../components/MetricCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { CurrentWeatherResponse } from "../types";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

const CurrentWeather = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [typedLocation, setTypedLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [data, setData] = useState<CurrentWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await fetch("/location.txt");
        if (!response.ok) {
          throw new Error("Unable to load locations list.");
        }
        const text = await response.text();
        setLocations(
          text
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load locations.");
      }
    };

    loadLocations();
  }, []);

  const effectiveLocation = useMemo(() => {
    return selectedLocation.trim() || typedLocation.trim();
  }, [selectedLocation, typedLocation]);

  const canSubmit = effectiveLocation.length > 0 && !loading;

  const handleSubmit = async () => {
    if (!effectiveLocation) {
      setError("Please select or enter a location.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`${API_BASE}/weather/current/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: effectiveLocation }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status}).`);
      }

      const payload = (await response.json()) as CurrentWeatherResponse;
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTypedLocation("");
    setSelectedLocation("");
    setData(null);
    setError(null);
  };

  const formatValue = (value: number | string | undefined, unit?: string) => {
    if (value === undefined || value === null || value === "") {
      return "--";
    }
    return unit ? `${value}${unit}` : `${value}`;
  };

  const handleDownloadJson = () => {
    if (!data) {
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `current-weather-${data.location}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    if (!data) {
      return;
    }

    const rows: Array<[string, string | number | boolean | null | undefined]> = [
      ["location", data.location],
      ["region", data.region],
      ["country", data.country],
      ["lat", data.lat],
      ["lon", data.lon],
      ["temperature_c", data.temperature_c],
      ["feels_like_c", data.feels_like_c],
      ["humidity", data.humidity],
      ["pressure_mb", data.pressure_mb],
      ["visibility_km", data.visibility_km],
      ["wind_kph", data.wind_kph],
      ["wind_degree", data.wind_degree],
      ["wind_direction", data.wind_direction],
      ["condition", data.condition],
      ["cloud", data.cloud],
      ["uv", data.uv],
      ["precip_mm", data.precip_mm],
      ["is_raining", data.is_raining],
      ["aqi_pm2_5", data.aqi?.pm2_5],
      ["aqi_pm10", data.aqi?.pm10],
      ["aqi_co", data.aqi?.co],
      ["aqi_no2", data.aqi?.no2],
      ["aqi_o3", data.aqi?.o3],
      ["aqi_so2", data.aqi?.so2],
    ];

    const csv = rows
      .map(([key, value]) => `${key},${value ?? ""}`)
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `current-weather-${data.location}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    if (!data) {
      return;
    }

    setDownloadingZip(true);
    try {
      const zip = new JSZip();
      const summary = {
        location: data.location,
        region: data.region,
        country: data.country,
        lat: data.lat,
        lon: data.lon,
      };
      const metrics = {
        temperature_c: data.temperature_c,
        feels_like_c: data.feels_like_c,
        humidity: data.humidity,
        pressure_mb: data.pressure_mb,
        visibility_km: data.visibility_km,
        wind_kph: data.wind_kph,
        wind_degree: data.wind_degree,
        wind_direction: data.wind_direction,
        condition: data.condition,
        cloud: data.cloud,
        uv: data.uv,
        precip_mm: data.precip_mm,
        is_raining: data.is_raining,
        aqi: data.aqi,
      };

      const rows: Array<[string, string | number | boolean | null | undefined]> = [
        ["location", data.location],
        ["region", data.region],
        ["country", data.country],
        ["lat", data.lat],
        ["lon", data.lon],
        ["temperature_c", data.temperature_c],
        ["feels_like_c", data.feels_like_c],
        ["humidity", data.humidity],
        ["pressure_mb", data.pressure_mb],
        ["visibility_km", data.visibility_km],
        ["wind_kph", data.wind_kph],
        ["wind_degree", data.wind_degree],
        ["wind_direction", data.wind_direction],
        ["condition", data.condition],
        ["cloud", data.cloud],
        ["uv", data.uv],
        ["precip_mm", data.precip_mm],
        ["is_raining", data.is_raining],
        ["aqi_pm2_5", data.aqi?.pm2_5],
        ["aqi_pm10", data.aqi?.pm10],
        ["aqi_co", data.aqi?.co],
        ["aqi_no2", data.aqi?.no2],
        ["aqi_o3", data.aqi?.o3],
        ["aqi_so2", data.aqi?.so2],
      ];
      const csv = rows
        .map(([key, value]) => `${key},${value ?? ""}`)
        .join("\n");

      zip.file("summary.json", JSON.stringify(summary, null, 2));
      zip.file("metrics.json", JSON.stringify(metrics, null, 2));
      zip.file("current-weather.json", JSON.stringify(data, null, 2));
      zip.file("current-weather.csv", csv);

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `current-weather-${data.location}.zip`;
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
      <Card className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Current Weather
          </h2>
          <p className="text-sm text-slate-500">
            Choose a location to fetch the latest weather, air quality, and
            atmospheric insights.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Search by city name"
            placeholder="Enter city name"
            value={typedLocation}
            onChange={(event) => setTypedLocation(event.target.value)}
          />
          <Select
            label="Or choose from the list"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Fetch Weather
          </Button>
          <Button variant="ghost" onClick={handleReset} disabled={loading}>
            Reset
          </Button>
          <p className="text-xs text-slate-500">
            If both fields are filled, the dropdown selection takes priority.
          </p>
        </div>
        {error && (
          <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertTriangle className="h-4 w-4" /> {error}
          </div>
        )}
      </Card>

      {loading && <LoadingSpinner />}

      {!loading && !data && !error && (
        <Card className="text-center text-sm text-slate-500">
          No data yet. Search for a location to see live conditions.
        </Card>
      )}

      {data && (
        <div className="grid gap-6">
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Download insights
              </p>
              <p className="text-xs text-slate-500">
                Export the realtime dataset in CSV, JSON, or a bundled ZIP.
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
          <SectionCard
            title="Location"
            description="Geographical and administrative details"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard label="Location" value={data.location} icon={<MapPin />} />
              <MetricCard label="Region" value={data.region} icon={<MapPin />} />
              <MetricCard label="Country" value={data.country} icon={<MapPin />} />
              <MetricCard
                label="Latitude"
                value={formatValue(data.lat)}
                icon={<Compass />}
              />
              <MetricCard
                label="Longitude"
                value={formatValue(data.lon)}
                icon={<Compass />}
              />
            </div>
          </SectionCard>

          <SectionCard title="Temperature">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Temperature"
                value={formatValue(data.temperature_c, "°C")}
                icon={<Thermometer />}
              />
              <MetricCard
                label="Feels Like"
                value={formatValue(data.feels_like_c, "°C")}
                icon={<Thermometer />}
              />
            </div>
          </SectionCard>

          <SectionCard title="Atmosphere">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                label="Humidity"
                value={formatValue(data.humidity, "%")}
                icon={<Droplets />}
              />
              <MetricCard
                label="Pressure"
                value={formatValue(data.pressure_mb, " mb")}
                icon={<Gauge />}
              />
              <MetricCard
                label="Visibility"
                value={formatValue(data.visibility_km, " km")}
                icon={<Eye />}
              />
            </div>
          </SectionCard>

          <SectionCard title="Wind">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                label="Wind Speed"
                value={formatValue(data.wind_kph, " kph")}
                icon={<Wind />}
              />
              <MetricCard
                label="Wind Degree"
                value={formatValue(data.wind_degree, "°")}
                icon={<Compass />}
              />
              <MetricCard
                label="Wind Direction"
                value={data.wind_direction}
                icon={<Compass />}
              />
            </div>
          </SectionCard>

          <SectionCard title="Sky Conditions">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard label="Condition" value={data.condition} icon={<CloudSun />} />
              <MetricCard
                label="Cloud Cover"
                value={formatValue(data.cloud, "%")}
                icon={<CloudSun />}
              />
              <MetricCard label="UV Index" value={formatValue(data.uv)} icon={<SunIcon />} />
            </div>
          </SectionCard>

          <SectionCard title="Precipitation">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Precipitation"
                value={formatValue(data.precip_mm, " mm")}
                icon={<CloudRain />}
              />
              <Card className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-3">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                      Is Raining
                    </p>
                      <p className="text-lg font-semibold text-slate-900">
                      {data.is_raining ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <Badge tone={data.is_raining ? "success" : "neutral"}>
                  {data.is_raining ? "Active" : "Clear"}
                </Badge>
              </Card>
            </div>
          </SectionCard>

          <SectionCard title="Air Quality Index">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                label="PM2.5"
                value={formatValue(data.aqi?.pm2_5, " µg/m³")}
                icon={<Gauge />}
              />
              <MetricCard
                label="PM10"
                value={formatValue(data.aqi?.pm10, " µg/m³")}
                icon={<Gauge />}
              />
              <MetricCard
                label="CO"
                value={formatValue(data.aqi?.co, " µg/m³")}
                icon={<Gauge />}
              />
              <MetricCard
                label="NO2"
                value={formatValue(data.aqi?.no2, " µg/m³")}
                icon={<Gauge />}
              />
              <MetricCard
                label="O3"
                value={formatValue(data.aqi?.o3, " µg/m³")}
                icon={<Gauge />}
              />
              <MetricCard
                label="SO2"
                value={formatValue(data.aqi?.so2, " µg/m³")}
                icon={<Gauge />}
              />
            </div>
          </SectionCard>
        </div>
      )}
    </section>
  );
};

const SunIcon = () => <Sun className="h-5 w-5" />;

export default CurrentWeather;
