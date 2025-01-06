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
  return (
    <div className="WeatherCards">
      <Card title="Temperature" value={`${weatherData.temperature}°C`} />
      <Card title="Cloud Cover" value={`${weatherData.cloudcover}%`} />
      <Card title="Wind Speed" value={`${weatherData.windspeed} km/h`} />
      <Card
        title="Rain / Snowfall"
        value={
          weatherData.precipitation > 0
            ? `Rain: ${weatherData.precipitation} mm, Snowfall: ${weatherData.snowfall} mm`
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
