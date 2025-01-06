import "./WeatherCards.scss";

import Card from "../Card/Card.tsx";
import { TSun, TWeatherData } from "../../App.tsx";

type TWeatherCardsProps = {
  weatherData: TWeatherData;
  sunHours: TSun;
  formatTime: (time: string) => string;
};

export default function WeatherCards({
  weatherData,
  sunHours,
  formatTime,
}: TWeatherCardsProps) {
  const precipation = weatherData.rain > 0 || weatherData.snowfall > 0;
  return (
    <div className="WeatherCards">
      <Card title="Temperature" value={`${weatherData.temperature}°C`} />
      <Card title="Cloud Cover" value={`${weatherData.cloudcover}%`} />
      <Card title="Wind Speed" value={`${weatherData.windspeed} km/h`} />
      <Card
        title={precipation ? "" : "Rain / Snowfall"}
        value={
          precipation
            ? `Rain: ${weatherData.rain} mm, Snowfall: ${weatherData.snowfall} cm`
            : "None"
        }
      />
      <div className="twoCards">
        <Card title="Sunrise" value={formatTime(sunHours.results.sunrise)} />
        <Card title="Sunset" value={formatTime(sunHours.results.sunset)} />
      </div>
    </div>
  );
}
