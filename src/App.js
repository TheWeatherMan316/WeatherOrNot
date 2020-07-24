import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DisplayRow from "./components/DisplayRow";
import TrendValue from "./components/DisplayRow/BoxContent/TrendValue";
import UnitValue from "./components/DisplayRow/BoxContent/UnitValue";
import Controls from "./components/DisplayRow/Controls";
import CurrentDate from "./components/DisplayRow/BoxContent/CurrentDate";
import "./App.css";

const tempArr = [];

const tempHistoryArr = [];

const barHistArr = [];

const measurements = [
  { value: 0, timestamp: 0 },
  { value: 0, timestamp: 0 },
];

function App() {
  const [temp, setTemp] = useState(0);
  const [bar, setBar] = useState(0);
  const [averageTemp, setAverageTemp] = useState(0);

  const measureTemp = () => {
    const newTemp = getRandomValue(-20, 40);
    const tempTime = new Date();
    setTemp(newTemp);
    tempArr.push(newTemp);
    const tempHistElement = {
      value: newTemp,
      time: tempTime,
    };
    tempHistoryArr.push(tempHistElement);
  };

  const tempHistory = tempHistoryArr.map((element) => (
    <li>
      {element.time.toLocaleDateString("de-DE")} | {element.time.toLocaleTimeString("de-DE")} |
      {element.value.toFixed(1).toString()}°C
    </li>
  ));

  const measureBar = () => {
    const newValue = getRandomValue(980, 1050);

    const newMeasurement = {
      value: null,
      timestamp: null,
    };

    setBar(newValue);
    const time = new Date();
    newMeasurement.timestamp = time;
    newMeasurement.value = newValue;

    measurements.push(newMeasurement);
    measurements.shift();

    const barHistElement = {
      value: newValue,
      time: time,
    };

    barHistArr.push(barHistElement);
  };

  const barHistory = barHistArr.map((element) => (
    <li>
      {element.time.toLocaleDateString("de-DE")} | {element.time.toLocaleTimeString("de-DE")} |
      {element.value.toFixed(0).toString()} mBar
    </li>
  ));

  function calcAverageTemp() {
    let sum = tempArr.reduce((a, b) => a + b, 0);
    let averageTemp = sum / tempArr.length;
    setAverageTemp(averageTemp);
  }

  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    setInterval(() => {
      measureTemp();
    }, 2000);
    setInterval(() => {
      measureBar();
    }, 5000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    calcAverageTemp();
  }, [temp]);

  const tempHistComponent = () => {
    return (
      <div className="container" id="tempHist">
        <div>
          <ul>{tempHistory}</ul>
        </div>
      </div>
    );
  };

  const barHistComponent = () => {
    return (
      <div className="container" id="barHist">
        <div>
          <ul>{barHistory}</ul>
        </div>
      </div>
    );
  };

  return (
    <div className="app" align="center">
      <div className="container">
        <Header />
        <DisplayRow label="Time" display={<CurrentDate time={true} />} />
        <DisplayRow label="Date" display={<CurrentDate time={false} />} />
        <DisplayRow
          label="Temperature"
          display={<UnitValue value={temp.toFixed(1).toString()} unit="°C" />}
          action={<Controls measure={measureTemp} />}
        />
        <DisplayRow
          label="Average Temperature"
          display={<UnitValue value={averageTemp.toFixed(1).toString()} unit="°C Ø" />}
        />
        <DisplayRow
          label="Barometric Pressure"
          display={<UnitValue value={bar.toFixed(0).toString()} unit="mbar" />}
          action={<Controls measure={measureBar} />}
        />
        <DisplayRow
          label="Barometric Pressure Trend"
          display={<TrendValue measurements={measurements} />}
        />
      </div>
      {tempHistComponent()}
      {barHistComponent()}
    </div>
  );
}

export default App;
