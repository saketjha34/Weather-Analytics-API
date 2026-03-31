import { Link, NavLink } from "react-router-dom";
import { BookOpen, CloudSun, Droplets, Github, Home, Radar } from "lucide-react";

const NavBar = () => {
  const linkBase =
    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition";

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <Link to="/" className="flex items-center gap-3 text-slate-900">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/10">
          <CloudSun className="h-5 w-5" />
        </span>
        <div>
          <p className="text-lg font-semibold">Weather + ML Hub</p>
          <p className="text-xs text-slate-500">
            Modern insights from real-time data
          </p>
        </div>
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <nav className="flex flex-wrap gap-2">
        <NavLink to="/" className={navClass} end>
          <Home className="h-4 w-4" /> Home
        </NavLink>
        <NavLink to="/weather/current" className={navClass}>
          <CloudSun className="h-4 w-4" /> Current Weather
        </NavLink>
        <NavLink to="/weather/forecast" className={navClass}>
          <Radar className="h-4 w-4" /> Forecast
        </NavLink>
        <NavLink to="/forecast/rainfall" className={navClass}>
          <Droplets className="h-4 w-4" /> ML Rainfall
        </NavLink>
        <NavLink to="/docs" className={navClass}>
          <BookOpen className="h-4 w-4" /> Docs
        </NavLink>
        </nav>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
      </div>
    </header>
  );
};

export default NavBar;
