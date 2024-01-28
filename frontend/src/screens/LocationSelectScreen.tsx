import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LocationSelectScreen.css";
import { MysteryProgress } from "../interfaces/MysteryProgress";

const LocationSelectScreen: React.FC = () => {
  const params = useParams();
  if (!params.mysteryId) {
    throw new Error("URL must contain mysteryId.");
  }
  const mysteryId: string = params.mysteryId;

  const navigate = useNavigate();
  const [progress, setProgress] = useState<MysteryProgress | null>();

  const handleTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "lightgray"; // Change color on touch start
  };

  const handleTouchEnd = (
    mysteryId: string,
    locationId: string,
    e: React.TouchEvent<HTMLLIElement>,
  ) => {
    e.currentTarget.style.backgroundColor = ""; // Revert color on touch end
    handleLocationSelect(mysteryId, locationId);
  };

  const handleLocationSelect = (mysteryId: string, locationId: string) => {
    navigate(`/location/mysteries/${mysteryId}/locations/${locationId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/progress/mysteries/${mysteryId}`);
      if (response.status != 200) {
        console.dir(response, { depth: null });
        throw new Error("Unable to fetch mystery data.");
      }
      const data = await response.json();
      setProgress(data);
    };

    fetchData();
  }, [mysteryId]);

  if (!progress) {
    // TODO(RWS): Make a loading screen.
    return (
      <div className="screen location-select-screen">
        <div className="screen-title">Select a location to visit</div>
        <div className="location-list-container" />
      </div>
    );
  }

  console.dir(progress, { depth: null });

  return (
    <div className="screen location-select-screen">
      <div className="screen-title">Select a location to visit</div>
      <div className="location-list-container">
        <ul className="location-list">
          {progress.locations
            .filter((location) => {
              return location.discovered;
            })
            .map((location, index) => (
              <li
                key={index}
                className="location-item"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(mysteryId, index, e)}
              >
                {progress.mystery.locations[index].name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationSelectScreen;
