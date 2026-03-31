import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Card from "../ui/Card";

interface ForecastFormProps {
  loading: boolean;
  onSubmit: (location: string, numDays: number) => void;
  onReset: () => void;
}

const ForecastForm = ({ loading, onSubmit, onReset }: ForecastFormProps) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [numDays, setNumDays] = useState(3);

  useEffect(() => {
    const loadLocations = async () => {
      const response = await fetch("/location.txt");
      if (!response.ok) {
        return;
      }
      const text = await response.text();
      setLocations(
        text
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean)
      );
    };

    loadLocations();
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(selectedLocation && numDays >= 1 && numDays <= 7 && !loading);
  }, [selectedLocation, numDays, loading]);

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Weather Forecast</h2>
        <p className="text-sm text-slate-500">
          Select a location and range to generate a detailed forecast analysis.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Select
          label="Location"
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
        <div className="flex flex-col gap-2 text-sm text-slate-600">
          <span className="font-medium text-slate-900">Number of days</span>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }, (_, index) => index + 1).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setNumDays(value)}
                className={`rounded-xl border px-3 py-1 text-sm font-medium transition ${
                  numDays === value
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Button
            className="w-full"
            onClick={() => onSubmit(selectedLocation, numDays)}
            disabled={!canSubmit}
          >
            <MapPin className="h-4 w-4" /> Get Forecast
          </Button>
          <Button variant="ghost" className="w-full" onClick={onReset} disabled={loading}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ForecastForm;
