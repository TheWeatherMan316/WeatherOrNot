import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarometricHistory from "./components/BarometricHistory";
import TemperatureHistory from "./components/TemperatureHistory";
import Home from "./components/Home";

const barometricMeasurements = [];

function App() {
  const [bar, setBar] = useState(0);
  const [temperatureMeasurements, setTemperatureMeasurements] = useState([{value: 0, time: Date.now()}])

  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  const measureTemperature = () => {
    const newTemperature = getRandomValue(-20, 40);
    const temperatureTime = new Date();
    storeTemperatureAndCalcAverage(newTemperature, temperatureTime);
  };

  function storeTemperatureAndCalcAverage(newTemperature, measurementTime) {
    const latestMeasurement = {
      value: newTemperature,
      time: measurementTime,
    };

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
    setBar(newPressure);
    const measurementTime = new Date();
    storeBarometricPressure(newPressure, measurementTime);
  };

  function storeBarometricPressure(newPressure, measurementTime) {
    const singleMeasurement = {
      value: newPressure,
      time: measurementTime,
    };

    barometricMeasurements.push(singleMeasurement);
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
                bar={bar}
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
