import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import Card from "../ui/Card";
import { WeatherForecastDay } from "../../types";

interface ForecastDayCardProps {
  day: WeatherForecastDay;
  unitLabel: string;
}

const ForecastDayCard = ({ day, unitLabel }: ForecastDayCardProps) => {
  return (
    <Card className="flex flex-col gap-4 border border-slate-200/80 bg-gradient-to-r from-white via-white to-slate-50 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Daily forecast</p>
          <p className="text-lg font-semibold text-slate-900">{day.condition}</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
          {day.date}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <Thermometer className="h-4 w-4 text-slate-500" />
          {day.min_temp_c.toFixed(1)} / {day.avg_temp_c.toFixed(1)} / {day.max_temp_c.toFixed(1)} {unitLabel}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <CloudRain className="h-4 w-4 text-slate-500" /> {day.total_precip_mm} mm
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <Droplets className="h-4 w-4 text-slate-500" /> {day.rain_probability}%
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <Wind className="h-4 w-4 text-slate-500" /> {day.max_wind_kph} kph
        </div>
      </div>
    </Card>
  );
};

export default ForecastDayCard;
