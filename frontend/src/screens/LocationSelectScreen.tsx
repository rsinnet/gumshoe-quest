import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationSelectScreen.css';
import { LOCATIONS } from './Locations';

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
    console.log(locationIndex)
    handleLocationSelect(locationIndex)
  };

  const handleLocationSelect = (locationIndex: number) => {
    navigate(`location/${locationIndex}`)
  }
  return (
    <div className="location-select-screen">
      <ul className="location-list">
        {LOCATIONS.map((location, index) => (
          <li
            key={index}
            className="location-item"
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(index, e)}
          >
            {location.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSelectScreen;
