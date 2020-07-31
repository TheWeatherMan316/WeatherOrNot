import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarometricHistory from "./components/BarometricHistory";
import TemperatureHistory from "./components/TemperatureHistory";
import Home from "./components/Home";

const temperatureMeasurements = [{value: 1, time: new Date}];
// Todo: error handling instead of initial value...

const barometricMeasurements = [];

function App() {
  const [bar, setBar] = useState(0);

  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  const measureTemperature = () => {
    const newTemperature = getRandomValue(-20, 40);
    const temperatureTime = new Date();
    storeTemperatureAndCalcAverage(newTemperature, temperatureTime);
  };

  function storeTemperatureAndCalcAverage(newTemperature, temperatureTime) {
    const singleMeasurement = {
      value: newTemperature,
      time: temperatureTime,
    };
    temperatureMeasurements.push(singleMeasurement);
    calcAverageTemperature();
  }

  function calcAverageTemperature() {
    let sum = 0;
    for (let i = 0; i < temperatureMeasurements.length; i++) {
      sum += temperatureMeasurements[i].value;
    }
    let averageTemperature = sum / temperatureMeasurements.length;
    return averageTemperature;
  }

  useEffect(() => {
    setInterval(() => {
      measureTemperature();
    }, 2000);
    // eslint-disable-next-line
  }, []);

  const measureBar = () => {
    const newBar = getRandomValue(980, 1050);
    setBar(newBar);
    const barTime = new Date();
    storeBar(newBar, barTime);
  };

  function storeBar(newBar, barTime) {
    const singleMeasurement = {
      value: newBar,
      time: barTime,
    };

    barometricMeasurements.push(singleMeasurement);
  }

  useEffect(() => {
    setInterval(() => {
      measureBar();
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
                calcAverageTemperature={calcAverageTemperature}
                bar={bar}
                measureBar={measureBar}
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
