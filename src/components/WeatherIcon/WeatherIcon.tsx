import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import DehazeIcon from "@mui/icons-material/Dehaze";
import VapingRoomsIcon from "@mui/icons-material/VapingRooms";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import "./style.css";

const WeatherIcon: React.FC<{ main: string }> = ({ main }) => {
  switch (main) {
    case "Clouds":
      return <FilterDramaIcon className="weather-icon" />;
    case "Haze":
      return <DehazeIcon className="weather-icon" />;
    case "Smoke":
      return <VapingRoomsIcon className="weather-icon" />;
    case "Clear":
      return <WbSunnyIcon className="weather-icon" />;
    default:
      return null;
  }
};

export default WeatherIcon;
