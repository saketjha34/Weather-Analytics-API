import { MapPin } from "lucide-react";
import Card from "../ui/Card";

interface WeatherSummaryCardProps {
  location: string;
  lat: number;
  lon: number;
}

const WeatherSummaryCard = ({ location, lat, lon }: WeatherSummaryCardProps) => {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-slate-600">
        <MapPin className="h-4 w-4" /> {location}
      </div>
      <div className="flex gap-6 text-sm text-slate-600">
        <span>Lat: {lat}</span>
        <span>Lon: {lon}</span>
      </div>
    </Card>
  );
};

export default WeatherSummaryCard;
