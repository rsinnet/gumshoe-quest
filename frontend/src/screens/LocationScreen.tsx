import React from 'react';
import { useParams } from 'react-router-dom';
import './LocationScreen.css';
import { LOCATIONS } from './Locations'

const LocationScreen: React.FC = () => {
    const params = useParams();
    const locationIndex: number = parseInt(params.locationIndex ?? "0")
    console.log(typeof locationIndex)
    console.log(LOCATIONS)
    const location = LOCATIONS[locationIndex];
    console.log(location.backgroundImage)

    return (
        <div className="location-screen" style={{ backgroundImage: `url(${location.backgroundImage})` }} ></div>
    );
};

export default LocationScreen;
