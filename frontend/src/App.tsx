import "./global.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LocationSelectScreen from './screens/LocationSelectScreen';
import LocationScreen from './screens/LocationScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationSelectScreen />} />
        <Route path="/location/:locationIndex" element={<LocationScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
