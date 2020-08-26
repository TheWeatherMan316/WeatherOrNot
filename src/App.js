import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarometricHistory from "./components/BarometricHistory";
import TemperatureHistory from "./components/TemperatureHistory";
import Home from "./components/Home";
import Routes from "./Routes";

function App() {
  const [temperatureMeasurements, setTemperatureMeasurements] = useState([]);
  const [barometricMeasurements, setBarometricMeasurements] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:4200/api/temperatures")
        .then((r) => r.json())
        .then((res) => {
          const currentTemperatures = res.map((r) => ({ value: r.value, time: new Date(r.time) }));
          setTemperatureMeasurements(currentTemperatures);
        });
    }, 2000);
  }, []);

  function measureTemperature() {
    fetch("http://localhost:4200/api/readTemperature")
      .then((r) => r.json())
      .then((res) => {
        const currentTemperatures = res.map((r) => ({ value: r.value, time: new Date(r.time) }));
        setTemperatureMeasurements(currentTemperatures);
      });
  }

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:4200/api/pressures")
        .then((r) => r.json())
        .then((res) => {
          const currentPressures = res.map((r) => ({ value: r.value, time: new Date(r.time) }));
          setBarometricMeasurements(currentPressures);
        });
    }, 5000);
  }, []);

  function measureBarometricPressure() {
    fetch("http://localhost:4200/api/readPressure")
      .then((r) => r.json())
      .then((res) => {
        const currentPressures = res.map((r) => ({ value: r.value, time: new Date(r.time) }));
        setBarometricMeasurements(currentPressures);
      });
  }

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
                onMeasureTemperatureClicked={() => measureTemperature()}
                onMeasureBarometricPressureClicked={() => measureBarometricPressure()}
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
