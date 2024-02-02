import React, { useEffect, useState } from "react";

import WeatherApiResponse from "./constants/models";
import SearchBar from "./components/SearchBar/SearchBar";
import Clock from "./components/Clock/Clock";
import StatItem from "./components/StatItem/StatItem";
import "./style.css";
import WeatherIcon from "./components/WeatherIcon/WeatherIcon";
import { WEATHER_API_KEY } from "./config";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Spinner from "./components/Spinner/Spinner";
import { debounce } from "./helpers/utils";

const App: React.FC = () => {
  const [place, setPlace] = useState("Belgrade");
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Belgrade",
    })
  );
  const [cityTime, setCityTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const updateCityTime = (timezone: number) => {
    const cityTime = new Date(
      new Date().getTime() + timezone * 1000 - 3600 * 1000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCityTime(cityTime);
    setCurrentTime(cityTime);
  };

  const debouncedSearch = debounce((place: string) => {
    setPlace(place);
  }, 500);

  const getWeatherData = async () => {
    setLoading(true);
    setError(null);

    if (place && place.length > 0) {
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`;
        let res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            `Weather data request failed with status: ${res.status}`
          );
        }

        let data = await res.json();

        if (!data || !data.main || !data.weather) {
          throw new Error(
            "Weather data is incomplete or missing required properties."
          );
        }
        setError("");

        setWeatherData(data);
        if (data.timezone) {
          updateCityTime(data.timezone);
        }
      } catch (err) {
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [place]);

  return (
    <div className="weather-container">
      <SearchBar
        onSearchChange={(value) => debouncedSearch.call(null, value)}
        getWeatherData={getWeatherData}
      />

      {loading && <Spinner />}

      {error && <ErrorMessage message={error} />}

      {weatherData && (
        <div className="weather-info">
          <div className="current-weather">
            <div className="weather-icon-container">
              <WeatherIcon main={weatherData.weather[0].main} />

              <p className="temperature">
                {(weatherData?.main.temp - 273.15).toFixed(1)} <span>°C</span>
              </p>
            </div>
            <div className="weather-details">
              <p className="city-name">{weatherData?.name}</p>
              <p className="weather-type">{weatherData?.weather[0].main}</p>
            </div>
          </div>
          <Clock currentTime={currentTime} />
        </div>
      )}

      {weatherData && (
        <div className="weather-stats">
          <StatItem label="Temperature" value={weatherData?.main.temp} />
          <StatItem
            label="Temperature Min"
            value={weatherData?.main.temp_min}
          />
          <StatItem
            label="Temperature Max"
            value={weatherData?.main.temp_max}
          />
          <StatItem label="Humidity" value={weatherData?.main.humidity} />
          <StatItem label="Visibility" value={weatherData?.visibility} />
          <StatItem label="Wind Speed" value={weatherData?.wind.speed} />
        </div>
      )}
    </div>
  );
};

export default App;
