import { Droplets, Gauge, Thermometer, Wind } from "lucide-react";
import MetricCard from "../MetricCard";

interface MetricSummaryProps {
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  totalRain: number;
  avgRainProbability: number;
  maxWind: number;
  unitLabel: string;
}

const MetricSummary = ({
  avgTemp,
  maxTemp,
  minTemp,
  totalRain,
  avgRainProbability,
  maxWind,
  unitLabel,
}: MetricSummaryProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        label="Average Temp"
        value={`${avgTemp.toFixed(1)} ${unitLabel}`}
        icon={<Thermometer className="h-4 w-4" />}
      />
      <MetricCard
        label="Max Temp"
        value={`${maxTemp.toFixed(1)} ${unitLabel}`}
        icon={<Thermometer className="h-4 w-4" />}
      />
      <MetricCard
        label="Min Temp"
        value={`${minTemp.toFixed(1)} ${unitLabel}`}
        icon={<Thermometer className="h-4 w-4" />}
      />
      <MetricCard
        label="Total Rainfall"
        value={`${totalRain.toFixed(1)} mm`}
        icon={<Droplets className="h-4 w-4" />}
      />
      <MetricCard
        label="Avg Rain Probability"
        value={`${avgRainProbability.toFixed(0)}%`}
        icon={<Gauge className="h-4 w-4" />}
      />
      <MetricCard
        label="Max Wind Speed"
        value={`${maxWind.toFixed(1)} kph`}
        icon={<Wind className="h-4 w-4" />}
      />
    </div>
  );
};

export default MetricSummary;
