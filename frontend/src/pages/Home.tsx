import { CloudSun, Droplets, Radar } from "lucide-react";
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

const Home = () => {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="flex h-full flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/10 text-slate-700 dark:bg-white/10 dark:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {card.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {card.description}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                to={card.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                Explore
              </Link>
            </div>
          </Card>
        );
      })}
    </section>
  );
};

export default Home;
