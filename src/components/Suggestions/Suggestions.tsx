import "./Suggestions.scss";

import SuggestionEntry from "../SuggestionEntry/SuggestionEntry.tsx";
import { TCity } from "../../App";

type TSuggestionsProps = {
  suggestions: TCity[];
  onCitySelect: (city: TCity) => void;
};

export default function Suggestions({
  suggestions,
  onCitySelect,
}: TSuggestionsProps) {
  return (
    <ul className="Suggestions">
      {suggestions.map((city) => (
        <SuggestionEntry key={city.name} city={city} onClick={onCitySelect} />
      ))}
    </ul>
  );
}
