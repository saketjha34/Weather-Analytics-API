import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CurrentWeather from "./pages/CurrentWeather";
import WeatherForecast from "./pages/WeatherForecast";
import RainfallForecast from "./pages/RainfallForecast";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-8">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather/current" element={<CurrentWeather />} />
            <Route path="/weather/forecast" element={<WeatherForecast />} />
            <Route path="/forecast/rainfall" element={<RainfallForecast />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
