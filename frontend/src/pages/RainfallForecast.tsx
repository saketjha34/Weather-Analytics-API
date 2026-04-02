import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Plot from "react-plotly.js";
import { AlertTriangle, Calendar, Download, Droplets } from "lucide-react";
import JSZip from "jszip";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Badge from "../components/ui/Badge";
import Select from "../components/ui/Select";
import {
  RainfallForecastRequest,
  RainfallForecastResponse,
} from "../types";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

const formatDate = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateNumDays = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
};

const buildCsv = (rows: Array<Array<string | number>>) =>
  rows.map((row) => row.join(",")).join("\n");

const RainfallForecast = () => {
  const [stations, setStations] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<RainfallForecastResponse | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const startPopoverRef = useRef<HTMLDivElement | null>(null);
  const endPopoverRef = useRef<HTMLDivElement | null>(null);
  const [startAnchor, setStartAnchor] = useState<DOMRect | null>(null);
  const [endAnchor, setEndAnchor] = useState<DOMRect | null>(null);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await fetch("/stations.txt");
        if (!response.ok) {
          throw new Error("Unable to load station list.");
        }
        const text = await response.text();
        setStations(
          text
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stations.");
      }
    };

    loadStations();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        startRef.current?.contains(target) ||
        endRef.current?.contains(target) ||
        startPopoverRef.current?.contains(target) ||
        endPopoverRef.current?.contains(target)
      ) {
        return;
      }
      setStartOpen(false);
      setEndOpen(false);
    };

    if (startOpen || endOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [startOpen, endOpen]);

  useEffect(() => {
    const updateAnchors = () => {
      if (startOpen && startRef.current) {
        setStartAnchor(startRef.current.getBoundingClientRect());
      }
      if (endOpen && endRef.current) {
        setEndAnchor(endRef.current.getBoundingClientRect());
      }
    };

    if (startOpen || endOpen) {
      updateAnchors();
      window.addEventListener("scroll", updateAnchors, true);
      window.addEventListener("resize", updateAnchors);
    }

    return () => {
      window.removeEventListener("scroll", updateAnchors, true);
      window.removeEventListener("resize", updateAnchors);
    };
  }, [startOpen, endOpen]);

  const dateError = useMemo(() => {
    if (!startDate || !endDate) {
      return null;
    }
    return endDate < startDate ? "End date must be on or after start date." : null;
  }, [startDate, endDate]);

  const canSubmit = Boolean(selectedStation && startDate && endDate && !dateError);

  const handleSubmit = async () => {
    if (!canSubmit || !startDate || !endDate) {
      setError("Please select a station and a valid date range.");
      return;
    }

    const numDays = calculateNumDays(startDate, endDate);
    const payload: RainfallForecastRequest = {
      station_name: selectedStation,
      start_date: formatDate(startDate),
      num_days: numDays,
    };

    setLoading(true);
    setError(null);
    setForecast(null);

    try {
      const response = await fetch(`${API_BASE}/forecast/rainfall/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Forecast request failed (${response.status}).`);
      }

      const data = (await response.json()) as RainfallForecastResponse;
      if (!data.predictions?.length) {
        setError("No predictions returned for the selected range.");
      }
      setForecast(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch forecast.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedStation("");
    setStartDate(undefined);
    setEndDate(undefined);
    setStartOpen(false);
    setEndOpen(false);
    setStartAnchor(null);
    setEndAnchor(null);
    setForecast(null);
    setError(null);
  };

  const popoverStyle = (anchor: DOMRect | null) => {
    if (!anchor) {
      return undefined;
    }

    return {
      position: "fixed" as const,
      top: anchor.bottom + 8,
      left: anchor.left,
      zIndex: 50,
    };
  };

  const handleDownloadCsv = () => {
    if (!forecast?.predictions?.length) {
      return;
    }

    const rows = [
      ["date_of_record", "predicted_rainfall"],
      ...forecast.predictions.map((item) => [item.date_of_record, item.predicted_rainfall]),
    ];
    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rainfall-forecast-${forecast.station_name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (!forecast) {
      return;
    }

    const json = JSON.stringify(forecast, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rainfall-forecast-${forecast.station_name}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    if (!forecast) {
      return;
    }

    setDownloadingZip(true);
    try {
      const zip = new JSZip();
      const summary = {
        station_name: forecast.station_name,
        start_date: forecast.start_date,
        num_days: forecast.num_days,
      };

      const csvRows = [
        ["date_of_record", "predicted_rainfall"],
        ...forecast.predictions.map((item) => [item.date_of_record, item.predicted_rainfall]),
      ];

      zip.file("summary.json", JSON.stringify(summary, null, 2));
      zip.file("forecast.json", JSON.stringify(forecast, null, 2));
      zip.file("forecast.csv", buildCsv(csvRows));

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rainfall-forecast-${forecast.station_name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingZip(false);
    }
  };

  const buildPlotTitle = (
    station: string,
    start: string,
    end: string,
    numDays: number
  ) =>
    `Rainfall Forecast<br><span style="font-size:0.75em;color:#64748b">Station: ${station} • Start: ${start} • End: ${end} • Days: ${numDays}</span>`;

  const dates = (forecast?.predictions ?? []).map((item) => item.date_of_record);
  const rainfall = (forecast?.predictions ?? []).map((item) => item.predicted_rainfall);

  return (
    <section className="space-y-6">
      <Card className="space-y-4 overflow-visible">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            ML Rainfall Forecast
          </h2>
          <p className="text-sm text-slate-500">
            Request model-based rainfall predictions by station and date range.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Select
            label="Station name"
            value={selectedStation}
            onChange={(event) => setSelectedStation(event.target.value)}
          >
            <option value="">Select station</option>
            {stations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </Select>
          <label className="flex w-full flex-col gap-2 text-sm text-slate-600">
            <span className="font-medium text-slate-900">
              Start date
            </span>
            <div ref={startRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setStartOpen((prev) => !prev);
                  setEndOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-left text-base text-slate-900 shadow-sm transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <span>{startDate ? formatDate(startDate) : "Pick start date"}</span>
                <Calendar className="h-4 w-4 text-slate-400" />
              </button>
              {startOpen &&
                createPortal(
                  <div
                    ref={startPopoverRef}
                    style={popoverStyle(startAnchor)}
                    className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <DayPicker
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setStartOpen(false);
                      }}
                    />
                  </div>,
                  document.body
                )}
            </div>
          </label>
          <label className="flex w-full flex-col gap-2 text-sm text-slate-600">
            <span className="font-medium text-slate-900">
              End date
            </span>
            <div ref={endRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setEndOpen((prev) => !prev);
                  setStartOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-left text-base text-slate-900 shadow-sm transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <span>{endDate ? formatDate(endDate) : "Pick end date"}</span>
                <Calendar className="h-4 w-4 text-slate-400" />
              </button>
              {endOpen &&
                createPortal(
                  <div
                    ref={endPopoverRef}
                    style={popoverStyle(endAnchor)}
                    className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <DayPicker
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        setEndOpen(false);
                      }}
                    />
                  </div>,
                  document.body
                )}
            </div>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handleSubmit} disabled={!canSubmit || loading}>
            Generate Forecast
          </Button>
          <Button variant="ghost" onClick={handleReset} disabled={loading}>
            Reset
          </Button>
          {dateError && (
            <Badge tone="warning" className="border-amber-400/40">
              {dateError}
            </Badge>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertTriangle className="h-4 w-4" /> {error}
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Model details</p>
          <p className="text-sm text-slate-500">
            Rainfall predictions are generated using an XGBoost regressor trained
            on historical station observations.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Train MAE</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">4.3523</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Val MAE</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">3.1666</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Train RMSE</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">9.8785</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Val RMSE</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">8.5814</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Train R2</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">0.5733</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Val R2</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">0.4716</p>
          </div>
        </div>
      </Card>

      {loading && <LoadingSpinner />}

      {forecast && (
        <div className="space-y-6">
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Download insights</p>
              <p className="text-xs text-slate-500">
                Export the rainfall forecast in CSV, JSON, or a bundled ZIP.
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
          <Card className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Droplets className="h-4 w-4" /> {forecast.station_name}
            </div>
            <div className="h-[420px] w-full">
              <Plot
                data={[
                  {
                    x: dates,
                    y: rainfall,
                    type: "scatter",
                    mode: "lines+markers",
                    line: { shape: "spline", width: 3, color: "#2563eb" },
                    marker: { size: 6, color: "#1d4ed8" },
                    hovertemplate: "%{x}<br>Rainfall: %{y:.2f} mm<extra></extra>",
                  },
                ]}
                layout={{
                  title: {
                    text: buildPlotTitle(
                      forecast.station_name,
                      forecast.start_date,
                      endDate ? formatDate(endDate) : forecast.start_date,
                      forecast.num_days
                    ),
                    x: 0.02,
                    xanchor: "left",
                  },
                  autosize: true,
                  margin: { l: 50, r: 30, t: 70, b: 50 },
                  xaxis: { title: "Date" },
                  yaxis: { title: "Predicted Rainfall (mm)" },
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                  font: { family: "Space Grotesk, IBM Plex Sans, sans-serif" },
                }}
                config={{ displaylogo: false, responsive: true }}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler
              />
            </div>
          </Card>
        </div>
      )}
    </section>
  );
};

export default RainfallForecast;
