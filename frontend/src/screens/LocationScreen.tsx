import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { MysteryProgress } from "../interfaces/MysteryProgress";
import "./LocationScreen.css";

const LocationScreen: React.FC = () => {
  const params = useParams();
  if (!params.mysteryId || !params.locationIndex) {
    throw new Error("URL must contain mysteryId and locationIndex.");
  }
  const mysteryId: string = params.mysteryId;
  const locationIndex: number = parseInt(params.locationIndex);

  const [progress, setProgress] = useState<MysteryProgress | null>();

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
    return (
      <div className="screen">
        <div className="screen-title">Loading location...</div>
      </div>
    );
  }

  const location = progress.mystery.locations[locationIndex];
  return (
    <div
      className="screen"
      style={{ backgroundImage: `url(/location-${locationIndex}.png)` }}
    >
      <div className="screen-title">{location.name}</div>
      <ChatBox mysteryId={mysteryId} locationIndex={locationIndex} />
    </div>
  );
};

export default LocationScreen;
