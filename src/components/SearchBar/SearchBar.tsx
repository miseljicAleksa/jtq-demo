import SearchIcon from "@mui/icons-material/Search";
import "./style.css";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  getWeatherData: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  getWeatherData,
}) => {
  return (
    <div className="searchbar">
      <input
        type="search"
        placeholder="Belgrade"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button onClick={getWeatherData}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
