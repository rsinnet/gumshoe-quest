import "./global.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationSelectScreen from "./screens/LocationSelectScreen";
import LocationScreen from "./screens/LocationScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/locationSelect/mysteries/:mysteryId"
          element={<LocationSelectScreen />}
        />
        <Route
          path="/location/mysteries/:mysteryId/locations/:locationIndex"
          element={<LocationScreen />}
        />
      </Routes>
    </Router>
  );
};

export default App;
