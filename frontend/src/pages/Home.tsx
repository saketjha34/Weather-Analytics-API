import { CloudSun, Droplets, Radar, Shield, Waves, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

const cards = [
  {
    title: "Current Weather",
    description: "Get live conditions, air quality, and wind data in seconds.",
    icon: CloudSun,
    href: "/weather/current",
  },
  {
    title: "Weather Forecast",
    description: "Explore upcoming weather trends and planning insights.",
    icon: Radar,
    href: "/weather/forecast",
  },
  {
    title: "ML Rainfall Forecast",
    description: "Model-driven rainfall predictions for critical planning.",
    icon: Droplets,
    href: "/forecast/rainfall",
  },
];

const highlights = [
  {
    title: "Reliable signals",
    description: "Built-in validation, resilient APIs, and rich metadata for decisions.",
    icon: Shield,
  },
  {
    title: "Hydrology readiness",
    description: "Forecast rainfall to prepare operations, supply, and risk response.",
    icon: Waves,
  },
  {
    title: "Wind + air quality",
    description: "Track air quality, wind, and visibility for situational awareness.",
    icon: Wind,
  },
];

const stats = [
  { label: "API uptime target", value: "99.9%" },
  { label: "Data refresh", value: "Live" },
  { label: "Forecast horizon", value: "1-3 days" },
];

const Home = () => {
  return (
    <section className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Weather Analytics API
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Professional climate intelligence for operational planning.
          </h1>
          <p className="text-base text-slate-600">
            Monitor real-time conditions, multi-day forecasts, and ML-driven rainfall
            projections in one streamlined workflow. Designed for teams who need
            accurate signals, fast turnaround, and consistent data exports.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/weather/current"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start with current weather
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View API docs
            </Link>
          </div>
        </div>
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Platform highlights</p>
            <p className="text-sm text-slate-500">
              End-to-end workflow for situational awareness and planning teams.
            </p>
          </div>
          <div className="space-y-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="flex h-full flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-900">
                  {card.title}
                </h2>
                <p className="text-sm text-slate-500">{card.description}</p>
              </div>
              <div className="mt-auto">
                <Link
                  to={card.href}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Explore
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">How it works</p>
          <p className="text-sm text-slate-500">
            A simple workflow that keeps analysts and operators in sync.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">01</p>
            <p className="text-sm font-semibold text-slate-900">Select a signal</p>
            <p className="text-sm text-slate-500">
              Choose live weather, multi-day forecasts, or rainfall predictions.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">02</p>
            <p className="text-sm font-semibold text-slate-900">Analyze outputs</p>
            <p className="text-sm text-slate-500">
              Review charts, summaries, and location insights built into the UI.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">03</p>
            <p className="text-sm font-semibold text-slate-900">Export & share</p>
            <p className="text-sm text-slate-500">
              Download JSON, CSV, or ZIP packages for reporting pipelines.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Home;
