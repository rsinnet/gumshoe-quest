import React from "react";
import { useParams } from "react-router-dom";
import "./LocationScreen.css";
import { LOCATIONS } from "./Locations";
import ChatBox from "../components/ChatBox";

const LocationScreen: React.FC = () => {
  const params = useParams();
  const locationIndex: number = parseInt(params.locationIndex ?? "0");
  const location = LOCATIONS[locationIndex];

  return (
    <div
      className="screen"
      style={{ backgroundImage: `url(${location.backgroundImage})` }}
    >
      <div className="screen-title">{location.name}</div>
      <ChatBox />
    </div>
  );
};

export default LocationScreen;
