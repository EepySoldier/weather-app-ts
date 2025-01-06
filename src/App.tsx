import "./App.scss";
import React, { useState } from "react";

import Header from "./components/Header/Header.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import WeatherCards from "./components/WeatherCards/WeatherCards.tsx";

import citiesjson from "./assets/cities.json";

export type TSun = {
  results: {
    sunrise: string;
    sunset: string;
  };
};

export type TCity = {
  name: string;
  lat: string;
  lon: string;
  country: string;
};

export type TWeatherData = {
  temperature: number;
  cloudcover: number;
  windspeed: number;
  rain: number;
  snowfall: number;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<TCity[]>([]);
  const [weatherData, setWeatherData] = useState<TWeatherData | null>(null);
  const [sunHours, setSunHours] = useState<TSun | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cities = citiesjson as TCity[];

  const hour = new Date().getHours();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);

    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const matches = cities.filter((city: TCity) =>
        city.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(matches.slice(0, 9));
    }
  };

  const fetchWeatherData = async (city: TCity) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m,rain,snowfall,cloud_cover,wind_speed_10m&forecast_days=1`,
      );
      const data = await response.json();

      const sun = await fetch(
        `https://api.sunrisesunset.io/json?lat=${city.lat}&lng=${city.lon}`,
      );
      const sunData = await sun.json();
      setSunHours({
        results: {
          sunrise: sunData.results.sunrise,
          sunset: sunData.results.sunset,
        },
      });
      setWeatherData({
        temperature: data.hourly.temperature_2m[hour],
        cloudcover: data.hourly.cloud_cover[hour] || 0,
        windspeed: data.hourly.wind_speed_10m[hour],
        rain: data.hourly.rain[hour] || 0,
        snowfall: data.hourly.snowfall[hour] || 0,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes, , period] = time.split(/[:\s]/);
    return `${hours}:${minutes} ${period}`;
  };
  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {weatherData && sunHours && <Header />}

          <SearchBar
            search={search}
            onSearchChange={handleSearchChange}
            suggestions={suggestions}
            onCitySelect={(city) => {
              setSearch(city.name);
              setSuggestions([]);
              fetchWeatherData(city);
            }}
          />

          {weatherData && sunHours && (
            <WeatherCards
              weatherData={weatherData}
              sunHours={sunHours}
              formatTime={formatTime}
            />
          )}
        </>
      )}
      <div className="credits">
        <h5>
          APIs used: <a href="https://open-meteo.com/">Open Meteo</a>,{" "}
          <a href="https://sunrisesunset.io/api/">Sunrise Sunset</a>
        </h5>
      </div>
    </div>
  );
}
export default App;
