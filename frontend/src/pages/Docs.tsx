import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Card from "../components/ui/Card";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const CodeBlock = ({ language, value }: { language?: string; value: string }) => {
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "linear-gradient(135deg, #0b1020 0%, #131b2e 100%)",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.75rem",
            lineHeight: "1.6",
            fontFamily:
              '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

const Docs = () => {
  const baseUrl = "https://weather-analytics-api-production.up.railway.app";

  return (
    <section className="space-y-6">
      <Card className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">API Docs</h2>
        <p className="text-sm text-slate-500">
          Base URL: <span className="font-semibold">{baseUrl}</span>
        </p>
        <p className="text-sm text-slate-500">
          All requests are JSON and use POST. Add the endpoint path to the base
          URL shown above.
        </p>
        <p className="text-sm text-slate-500">
          Routes: /weather/current/ (current conditions), /forecast/weather/
          (multi-day forecast), /forecast/rainfall/ (ML rainfall forecast). The
          rainfall route expects a valid station name and an ISO date
          (YYYY-MM-DD).
        </p>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">1) Current Weather</h3>
        <p className="text-sm text-slate-500">
          Endpoint: {baseUrl}/weather/current/
        </p>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700">Request Body</p>
            <CopyButton value={`{\n  "location": "Bangalore"\n}`} />
          </div>
          <CodeBlock
            language="json"
            value={`{
  "location": "Bangalore"
}`}
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700">Response (summary)</p>
            <CopyButton
              value={`{\n  "location": "Bangalore",\n  "region": "Karnataka",\n  "country": "India",\n  "lat": 12.97,\n  "lon": 77.59,\n  "temperature_c": 28.5,\n  "feels_like_c": 30.1,\n  "humidity": 65,\n  "pressure_mb": 1012,\n  "visibility_km": 10.0,\n  "wind_kph": 15.2,\n  "wind_degree": 180,\n  "wind_direction": "SW",\n  "condition": "Partly cloudy",\n  "cloud": 40,\n  "uv": 6.5,\n  "precip_mm": 2.3,\n  "is_raining": true,\n  "aqi": { "pm2_5": 35.4, "pm10": 70.2, "co": 200.5, "no2": 15.3, "o3": 120.7, "so2": 5.2 }\n}`}
            />
          </div>
          <CodeBlock
            language="json"
            value={`{
  "location": "Bangalore",
  "region": "Karnataka",
  "country": "India",
  "lat": 12.97,
  "lon": 77.59,
  "temperature_c": 28.5,
  "feels_like_c": 30.1,
  "humidity": 65,
  "pressure_mb": 1012,
  "visibility_km": 10.0,
  "wind_kph": 15.2,
  "wind_degree": 180,
  "wind_direction": "SW",
  "condition": "Partly cloudy",
  "cloud": 40,
  "uv": 6.5,
  "precip_mm": 2.3,
  "is_raining": true,
  "aqi": { "pm2_5": 35.4, "pm10": 70.2, "co": 200.5, "no2": 15.3, "o3": 120.7, "so2": 5.2 }
}`}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">Curl</p>
                <CopyButton
                  value={`curl -X POST ${baseUrl}/weather/current/ \\\n  -H "Content-Type: application/json" \\
  -d '{"location":"Bangalore"}'`}
              />
            </div>
            <CodeBlock
              language="bash"
              value={`curl -X POST ${baseUrl}/weather/current/ \\
  -H "Content-Type: application/json" \\
  -d '{"location":"Bangalore"}'`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">Python</p>
              <CopyButton
                value={`import requests\n\nresp = requests.post(\n    "${baseUrl}/weather/current/",\n    json={"location": "Bangalore"},\n)\nprint(resp.json())`}
              />
            </div>
            <CodeBlock
              language="python"
              value={`import requests

resp = requests.post(
  "${baseUrl}/weather/current/",
  json={"location": "Bangalore"},
)
print(resp.json())`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">JavaScript</p>
              <CopyButton
                value={`const resp = await fetch("${baseUrl}/weather/current/", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ location: "Bangalore" }),\n});\nconsole.log(await resp.json());`}
              />
            </div>
            <CodeBlock
              language="javascript"
              value={`const resp = await fetch("${baseUrl}/weather/current/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ location: "Bangalore" }),
});
console.log(await resp.json());`}
            />
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">2) Weather Forecast</h3>
        <p className="text-sm text-slate-500">
          Endpoint: {baseUrl}/forecast/weather/
        </p>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700">Request Body</p>
            <CopyButton value={`{\n  "location": "Delhi",\n  "num_days": 5\n}`} />
          </div>
          <CodeBlock
            language="json"
            value={`{
  "location": "Delhi",
  "num_days": 5
}`}
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700">Response (summary)</p>
            <CopyButton
              value={`{\n  "location": "Delhi",\n  "lat": 28.61,\n  "lon": 77.20,\n  "forecast": [\n    {\n      "date": "2026-03-31",\n      "avg_temp_c": 27.5,\n      "max_temp_c": 32.0,\n      "min_temp_c": 22.1,\n      "total_precip_mm": 5.6,\n      "rain_probability": 80,\n      "will_rain": true,\n      "max_wind_kph": 20.5,\n      "condition": "Light rain"\n    }\n  ]\n}`}
            />
          </div>
          <CodeBlock
            language="json"
            value={`{
  "location": "Delhi",
  "lat": 28.61,
  "lon": 77.20,
  "forecast": [
    {
      "date": "2026-03-31",
      "avg_temp_c": 27.5,
      "max_temp_c": 32.0,
      "min_temp_c": 22.1,
      "total_precip_mm": 5.6,
      "rain_probability": 80,
      "will_rain": true,
      "max_wind_kph": 20.5,
      "condition": "Light rain"
    }
  ]
}`}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">Curl</p>
                <CopyButton
                  value={`curl -X POST ${baseUrl}/forecast/weather/ \\\n  -H "Content-Type: application/json" \\
  -d '{"location":"Delhi","num_days":5}'`}
              />
            </div>
            <CodeBlock
              language="bash"
              value={`curl -X POST ${baseUrl}/forecast/weather/ \\
  -H "Content-Type: application/json" \\
  -d '{"location":"Delhi","num_days":5}'`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">Python</p>
              <CopyButton
                value={`import requests\n\nresp = requests.post(\n    "${baseUrl}/forecast/weather/",\n    json={"location": "Delhi", "num_days": 5},\n)\nprint(resp.json())`}
              />
            </div>
            <CodeBlock
              language="python"
              value={`import requests

resp = requests.post(
  "${baseUrl}/forecast/weather/",
  json={"location": "Delhi", "num_days": 5},
)
print(resp.json())`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">JavaScript</p>
              <CopyButton
                value={`const resp = await fetch("${baseUrl}/forecast/weather/", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ location: "Delhi", num_days: 5 }),\n});\nconsole.log(await resp.json());`}
              />
            </div>
            <CodeBlock
              language="javascript"
              value={`const resp = await fetch("${baseUrl}/forecast/weather/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ location: "Delhi", num_days: 5 }),
});
console.log(await resp.json());`}
            />
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">3) ML Rainfall Forecast</h3>
        <p className="text-sm text-slate-500">
          Endpoint: {baseUrl}/forecast/rainfall/
        </p>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700">Request Body</p>
            <CopyButton
              value={`{\n  "station_name": "Agumbe",\n  "start_date": "2026-03-31",\n  "num_days": 5\n}`}
            />
          </div>
          <CodeBlock
            language="json"
            value={`{
  "station_name": "Agumbe",
  "start_date": "2026-03-31",
  "num_days": 5
}`}
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-700">Response (summary)</p>
            <CopyButton
              value={`{\n  "station_name": "Agumbe",\n  "start_date": "2026-03-31",\n  "num_days": 5,\n  "predictions": [\n    {\n      "date_of_record": "2026-03-31",\n      "predicted_rainfall": 2.4\n    }\n  ]\n}`}
            />
          </div>
          <CodeBlock
            language="json"
            value={`{
  "station_name": "Agumbe",
  "start_date": "2026-03-31",
  "num_days": 5,
  "predictions": [
    {
      "date_of_record": "2026-03-31",
      "predicted_rainfall": 2.4
    }
  ]
}`}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">Curl</p>
                <CopyButton
                  value={`curl -X POST ${baseUrl}/forecast/rainfall/ \\\n  -H "Content-Type: application/json" \\
  -d '{"station_name":"Agumbe","start_date":"2026-03-31","num_days":5}'`}
              />
            </div>
            <CodeBlock
              language="bash"
              value={`curl -X POST ${baseUrl}/forecast/rainfall/ \\
  -H "Content-Type: application/json" \\
  -d '{"station_name":"Agumbe","start_date":"2026-03-31","num_days":5}'`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">Python</p>
              <CopyButton
                value={`import requests\n\nresp = requests.post(\n    "${baseUrl}/forecast/rainfall/",\n    json={\n        "station_name": "Agumbe",\n        "start_date": "2026-03-31",\n        "num_days": 5,\n    },\n)\nprint(resp.json())`}
              />
            </div>
            <CodeBlock
              language="python"
              value={`import requests

resp = requests.post(
  "${baseUrl}/forecast/rainfall/",
  json={
    "station_name": "Agumbe",
    "start_date": "2026-03-31",
    "num_days": 5,
  },
)
print(resp.json())`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-700">JavaScript</p>
              <CopyButton
                value={`const resp = await fetch("${baseUrl}/forecast/rainfall/", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({\n    station_name: "Agumbe",\n    start_date: "2026-03-31",\n    num_days: 5,\n  }),\n});\nconsole.log(await resp.json());`}
              />
            </div>
            <CodeBlock
              language="javascript"
              value={`const resp = await fetch("${baseUrl}/forecast/rainfall/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    station_name: "Agumbe",
    start_date: "2026-03-31",
    num_days: 5,
  }),
});
console.log(await resp.json());`}
            />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Docs;