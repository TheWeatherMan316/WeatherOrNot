import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DisplayRow from "./components/DisplayRow";
import TrendValue from "./components/DisplayRow/BoxContent/TrendValue";
import UnitValue from "./components/DisplayRow/BoxContent/UnitValue";
import Controls from "./components/DisplayRow/Controls";
import CurrentDate from "./components/DisplayRow/BoxContent/CurrentDate";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const tempHistoryArr = [];

const barHistArr = [
  {
    value: 0,
    time: new Date(),
  },
  {
    value: 0,
    time: new Date(),
  },
];

function App() {
  const [temp, setTemp] = useState(0);
  const [averageTemp, setAverageTemp] = useState(0);
  const [bar, setBar] = useState(0);

  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  const measureTemp = () => {
    const newTemp = getRandomValue(-20, 40);
    const tempTime = new Date();
    setTemp(newTemp);
    storeTemp(newTemp, tempTime);
  };

  function storeTemp(newTemp, tempTime) {
    const tempHistElement = {
      value: newTemp,
      time: tempTime,
    };
    tempHistoryArr.push(tempHistElement);
  }

  const tempHistory = tempHistoryArr.map((element) => (
    <li>
      {element.time.toLocaleDateString("de-DE")} | {element.time.toLocaleTimeString("de-DE")} |
      {element.value.toFixed(1).toString()}°C
    </li>
  ));

  const tempHistComponent = () => {
    return (
      <div>
        <ul>{tempHistory}</ul>
      </div>
    );
  };

  function calcAverageTemp() {
    let sum = 0;
    for (let i = 0; i < tempHistoryArr.length; i++) {
      sum += tempHistoryArr[i].value;
    }
    let averageTemp = sum / tempHistoryArr.length;
    setAverageTemp(averageTemp);
  }

  useEffect(() => {
    setInterval(() => {
      measureTemp();
    }, 2000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    calcAverageTemp();
  }, [temp]);

  const measureBar = () => {
    const newBar = getRandomValue(980, 1050);
    setBar(newBar);
    const barTime = new Date();
    storeBar(newBar, barTime);
  };

  function storeBar(newBar, barTime) {
    const barHistElement = {
      value: newBar,
      time: barTime,
    };

    barHistArr.push(barHistElement);
  }

  const barHistory = barHistArr.map((element) => (
    <li>
      {element.time.toLocaleDateString("de-DE")} | {element.time.toLocaleTimeString("de-DE")} |
      {element.value.toFixed(0).toString()} mBar
    </li>
  ));

  const barHistComponent = () => {
    return (
      <div>
        <ul>{barHistory}</ul>
      </div>
    );
  };

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
          <Route path="/">
            <Header />
            <DisplayRow label="Time" display={<CurrentDate time={true} />} />
            <DisplayRow label="Date" display={<CurrentDate time={false} />} />
            <DisplayRow
              label="Temperature"
              display={<UnitValue value={temp.toFixed(1).toString()} unit="°C" />}
              action={<Controls action={measureTemp} buttonLabel="measure" />}
              history={
                <Link to="/tempHist">
                  <Controls buttonLabel="history" />
                </Link>
              }
            />
            <DisplayRow
              label="Average Temperature"
              display={<UnitValue value={averageTemp.toFixed(1).toString()} unit="°C Ø" />}
            />
            <DisplayRow
              label="Barometric Pressure"
              display={<UnitValue value={bar.toFixed(0).toString()} unit="mbar" />}
              action={<Controls action={measureBar} buttonLabel="measure" />}
              history={
                <Link to="/barHist">
                  <Controls buttonLabel="history" />
                </Link>
              }
            />
            <DisplayRow
              label="Barometric Pressure Trend"
              display={<TrendValue measurements={barHistArr} />}
            />
          </Route>
          <Route path="/tempHist">{tempHistComponent()}</Route>
          <Route path="/barHist">{barHistComponent()}</Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
