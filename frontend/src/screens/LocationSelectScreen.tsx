import React from "react";
import { useNavigate } from "react-router-dom";
import "./LocationSelectScreen.css";
import { LOCATIONS } from "./Locations";

const LocationSelectScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "lightgray"; // Change color on touch start
  };

  const handleTouchEnd = (
    locationIndex: number,
    e: React.TouchEvent<HTMLLIElement>,
  ) => {
    e.currentTarget.style.backgroundColor = ""; // Revert color on touch end
    handleLocationSelect(locationIndex);
  };

  const handleLocationSelect = (locationIndex: number) => {
    navigate(`location/${locationIndex}`);
  };
  return (
    <div className="screen location-select-screen">
      <div className="screen-title">Select a location to visit</div>
      <div className="location-list-container">
        <ul className="location-list">
          {LOCATIONS.filter((location) => {
            return location.discovered;
          }).map((location) => (
            <li
              key={location.index}
              className="location-item"
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(location.index, e)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationSelectScreen;
