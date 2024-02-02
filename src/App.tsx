import "./style.css";
import { useEffect, useState } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WeatherApiResponse from "./constants/models";
import SearchBar from "./components/SearchBar/SearchBar";
import Clock from "./components/Clock/Clock";
import StatItem from "./components/StatItem/StatItem";

let WEATHER_API_KEY = "41576edb6bf36def6a7ba25cfe60bf3f";

export default function App() {
  const [place, setPlace] = useState("Belgrade");
  const [placeData, setPlaceData] = useState<WeatherApiResponse | null>(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const getWeatherData = async () => {
    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        let data = await res.json();
        setPlaceData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="weather-container">
      <SearchBar onSearchChange={setPlace} getWeatherData={getWeatherData} />

      {placeData && (
        <div className="weather-info">
          <div className="current-weather">
            <div className="weather-icon-container">
              {placeData.weather[0].main === "Clouds" && (
                <FilterDramaIcon className="weather-icon" />
              )}
              {placeData.weather[0].main === "Haze" && (
                <DehazeIcon className="weather-icon" />
              )}
              {placeData.weather[0].main === "Smoke" && (
                <VapingRoomsIcon className="weather-icon" />
              )}
              {placeData.weather[0].main === "Clear" && (
                <WbSunnyIcon className="weather-icon" />
              )}

              <p className="temperature">
                {(placeData?.main.temp - 273.15).toFixed(1)} <span>°C</span>
              </p>
            </div>
            <div className="weather-details">
              <p className="city-name">{placeData?.name}</p>
              <p className="weather-type">{placeData?.weather[0].main}</p>
            </div>
          </div>
          <Clock currentTime={currentTime} />
        </div>
      )}

      {placeData && (
        <div className="weather-stats">
          <StatItem label="Temperature" value={placeData?.main.temp} />
          <StatItem label="Temperature Min" value={placeData?.main.temp_min} />
          <StatItem label="Temperature Max" value={placeData?.main.temp_max} />
          <StatItem label="Humidity" value={placeData?.main.humidity} />
          <StatItem label="Visibility" value={placeData?.visibility} />
          <StatItem label="Wind Speed" value={placeData?.wind.speed} />
        </div>
      )}
    </div>
  );
}
