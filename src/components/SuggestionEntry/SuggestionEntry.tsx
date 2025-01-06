import "./SuggestionEntry.scss";

import { TCity } from "../../App.tsx";

type TSuggestionEntryProps = {
  city: TCity;
  onClick: (city: TCity) => void;
};

export default function SuggestionEntry({
  city,
  onClick,
}: TSuggestionEntryProps) {
  return (
    <li onClick={() => onClick(city)}>
      {city.name}, {city.country}
    </li>
  );
}
