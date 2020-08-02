import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarometricHistory from "./components/BarometricHistory";
import TemperatureHistory from "./components/TemperatureHistory";
import Home from "./components/Home";


function App() {

  const [temperatureMeasurements, setTemperatureMeasurements] = useState([{value: 0, time: new Date()}])
  const [barometricMeasurements, setBarometricMeasurements] = useState([{value: 0, time: new Date()}])

  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  const measureTemperature = () => {
    const newTemperature = getRandomValue(-20, 40);
    const measurementTime = new Date();
    storeTemperature(newTemperature, measurementTime);
  };

  function storeTemperature(newTemperature, measurementTime) {
    const latestMeasurement = {
      value: newTemperature,
      time: measurementTime,
    };
    console.log(temperatureMeasurements)
    const newArray = [...temperatureMeasurements, latestMeasurement]
    setTemperatureMeasurements(newArray)
  }

  useEffect(() => {
    setInterval(() => {
      measureTemperature();
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const measureBarometricPressure = () => {
    const newPressure = getRandomValue(980, 1050);
    const measurementTime = new Date();
    storeBarometricPressure(newPressure, measurementTime);
  };

  function storeBarometricPressure(newPressure, measurementTime) {
    const latestMeasurement = {
      value: newPressure,
      time: measurementTime,
    };

    const newArray = [...barometricMeasurements, latestMeasurement]
    setBarometricMeasurements(newArray)
  }

  useEffect(() => {
    setInterval(() => {
      measureBarometricPressure();
    }, 5000);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="app" align="center">
      <div className="container">
        <Router>
          <Switch>
            <Route path="/temperature_history">
              <TemperatureHistory temperatureMeasurements={temperatureMeasurements} />
            </Route>
            <Route path="/barometric_history">
              <BarometricHistory barometricMeasurements={barometricMeasurements} />
            </Route>
            <Route path="/home">
              <Home
                temperatureMeasurements={temperatureMeasurements}
                measureTemperature={measureTemperature}
                measureBarometricPressure={measureBarometricPressure}
                barometricMeasurements={barometricMeasurements}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
