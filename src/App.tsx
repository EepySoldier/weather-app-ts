import React, { useState } from "react";
import "./App.scss";
import citiesjson from "./assets/cities.json";

type TSun = {
  results: {
    sunrise: string;
    sunset: string;
  };
};

type City = {
  name: string;
  lat: string;
  lon: string;
  country: string;
};

type WeatherData = {
  temperature: number;
  cloudcover: number;
  windspeed: number;
  precipitation: number;
  snowfall: number;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [sunHours, setSunHours] = useState<TSun | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const cities = citiesjson as City[];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);

    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      const matches = cities.filter((city: City) =>
        city.name.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(matches.slice(0, 5));
    }
  };

  const fetchWeatherData = async (city: City) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`,
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
        temperature: data.current_weather.temperature,
        cloudcover: data.current_weather.cloudcover || 0,
        windspeed: data.current_weather.windspeed,
        precipitation: data.current_weather.precipitation || 0,
        snowfall: data.current_weather.snowfall || 0,
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
    <div className="app">
      {loading ? (
        <h1>Loading...</h1> // Show loading message when fetching data
      ) : (
        <>
          {weatherData !== null && sunHours !== null && (
            <h1 style={{ marginBottom: "3rem" }}>
              Weather data for{" "}
              {new Date().getHours() > 12
                ? new Date().getHours() - 12
                : new Date().getHours()}
              {":"}
              {new Date().getMinutes().toString().padStart(2, "0")}
              {new Date().getHours() > 12 ? " PM" : " AM"}
            </h1>
          )}

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((city) => (
                  <li
                    key={city.name}
                    onClick={() => {
                      setSearch(city.name);
                      setSuggestions([]);
                      fetchWeatherData(city);
                    }}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {weatherData && sunHours && (
            <div className="weather-cards">
              <div className="card">
                Temperature: {weatherData.temperature}°C
              </div>
              <div className="card">Cloud Cover: {weatherData.cloudcover}%</div>
              <div className="card">
                Wind Speed: {weatherData.windspeed} km/h
              </div>
              {weatherData.precipitation > 0 ? (
                <div className="card">
                  Rain: {weatherData.precipitation} mm <br />
                  Snowfall: {weatherData.snowfall} mm
                </div>
              ) : (
                <div className="card">Rain / Snowfall: none</div>
              )}
              <div className="two-cards">
                <div className="card">
                  Sunrise: {formatTime(sunHours.results.sunrise)}
                </div>
                <div className="card">
                  Sunset: {formatTime(sunHours.results.sunset)}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div className="credits">
        <h5>
          Apis used: <a href="https://open-meteo.com/">Open Meteo</a>,{" "}
          <a href="https://sunrisesunset.io/api/">Sunrise Sunset</a>
        </h5>
      </div>
    </div>
  );
}

export default App;
