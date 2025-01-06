import "./SearchBar.scss";

import { ChangeEvent } from "react";

import Suggestions from "../Suggestions/Suggestions.tsx";
import { TCity } from "../../App";

type TSearchBarProps = {
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions: TCity[];
  onCitySelect: (city: TCity) => void;
};

export default function SearchBar({
  search,
  onSearchChange,
  suggestions,
  onCitySelect,
}: TSearchBarProps) {
  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search city..."
        value={search}
        onChange={onSearchChange}
      />
      {suggestions.length > 0 && (
        <Suggestions suggestions={suggestions} onCitySelect={onCitySelect} />
      )}
    </div>
  );
}
