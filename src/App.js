import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarometricHistory from "./components/BarometricHistory";
import TemperatureHistory from "./components/TemperatureHistory";
import Home from "./components/Home";
import Routes from "./Routes"


function App() {

  const [temperatureMeasurements, setTemperatureMeasurements] = useState([])
  const [barometricMeasurements, setBarometricMeasurements] = useState([])

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
    temperatureMeasurements.push(latestMeasurement)
    setTemperatureMeasurements([...temperatureMeasurements])
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
    barometricMeasurements.push(latestMeasurement)
    setBarometricMeasurements([...barometricMeasurements])
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
            <Route path={Routes.temperatureHistory}>
              <TemperatureHistory temperatureMeasurements={temperatureMeasurements} />
            </Route>
            <Route path={Routes.barometricHistory}>
              <BarometricHistory barometricMeasurements={barometricMeasurements} />
            </Route>
            <Route path={Routes.home}>
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
