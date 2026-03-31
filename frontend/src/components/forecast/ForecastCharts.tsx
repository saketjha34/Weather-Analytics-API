import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeatherForecastDay } from "../../types";
import Card from "../ui/Card";

interface ForecastChartsProps {
  data: WeatherForecastDay[];
  unitLabel: string;
}

const ForecastCharts = ({ data, unitLabel }: ForecastChartsProps) => {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Temperature Trends</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: "#64748b" }} label={{ value: "Date", position: "insideBottom", offset: -4 }} />
              <YAxis tick={{ fill: "#64748b" }} label={{ value: `Temperature (${unitLabel})`, angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="avg_temp_c" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="max_temp_c" stroke="#f97316" strokeWidth={2} />
              <Line type="monotone" dataKey="min_temp_c" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500">Temperature in {unitLabel}.</p>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Rainfall Volume</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: "#64748b" }} label={{ value: "Date", position: "insideBottom", offset: -4 }} />
              <YAxis tick={{ fill: "#64748b" }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="total_precip_mm" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500">Total precipitation (mm).</p>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Rain Probability</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: "#64748b" }} label={{ value: "Date", position: "insideBottom", offset: -4 }} />
              <YAxis tick={{ fill: "#64748b" }} label={{ value: "Probability (%)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rain_probability"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500">Chance of rain (%).</p>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Wind Speed</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: "#64748b" }} label={{ value: "Date", position: "insideBottom", offset: -4 }} />
              <YAxis tick={{ fill: "#64748b" }} label={{ value: "Wind (kph)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="max_wind_kph"
                stroke="#0ea5e9"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500">Wind speed (kph).</p>
      </Card>
    </div>
  );
};

export default ForecastCharts;
