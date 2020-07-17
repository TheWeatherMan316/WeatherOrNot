import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DisplayRow from "./components/DisplayRow";
import TrendValue from "./components/DisplayRow/BoxContent/TrendValue";
import UnitValue from "./components/DisplayRow/BoxContent/UnitValue";
import Controls from "./components/DisplayRow/Controls";

import "./App.css";
let tempArr = [];
let barArr = [0, 0];
let barTimestampArr = [0, 0];
const measurements = [ {value: 0, timestamp: 0}, {value: 0, timestamp: 0}]

function App() {
  const [temp, setTemp] = useState(0);
  const [bar, setBar] = useState(0);
  const [averageTemp, setAverageTemp] = useState(0);
  const [trend, setTrend] = useState("stable");

  const measureTemp = () => {
    setTemp(getRandomValue(-20, 40));
  };

  const measureBar = () => {
    const newValue = getRandomValue(980, 1050);
    
    const newMeasurement = {
      value: null,
      timestamp: null
    }

    setBar(newValue);
    
    newMeasurement.timestamp = Date.now();
    newMeasurement.value = newValue;

    measurements.push(newMeasurement)
    measurements.shift()

  };

  function calcAverageTemp(temperature) {
    let latest = temperature;
    tempArr.push(latest);
    let sum = tempArr.reduce((a, b) => a + b, 0);

    let averageTemp = sum / tempArr.length;

    setAverageTemp(averageTemp);
  }

  function calcBarTrend() {

    const pressureDifference = measurements[1].value - measurements[0].value;
    const timeDifference = measurements[1].timestamp - measurements[0].timestamp;

    const standardBarDiff = 10;
    const standardTimeDiff = 10000;
    const standardGradient = Math.abs(standardBarDiff / standardTimeDiff);
    // standardGradient now: 0.001

    const gradient = Math.abs(pressureDifference / timeDifference);

    if (pressureDifference >= 4 && gradient >= standardGradient) {
      setTrend("rising");
    } else if (pressureDifference >= 4 && gradient < standardGradient) {
      setTrend("stable");
    } else if (pressureDifference < 4 && pressureDifference > -4) {
      setTrend("stable");
    } else if (pressureDifference <= -4 && gradient < standardGradient) {
      setTrend("stable");
    } else if (pressureDifference <= -4 && gradient >= standardGradient) {
      setTrend("falling");
    }
  }

  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    setInterval(() => {
      measureTemp();
    }, 1000);
    setInterval(() => {
      measureBar();
    }, 5000);
  }, []);

  useEffect(() => {
    calcAverageTemp(temp);
  }, [temp]);

  useEffect(() => {
    calcBarTrend();
  }, [bar]);

  return (
    <div className="app" align="center">
      <div className="container">
        <Header />
        <DisplayRow
          label="Temperature"
          display={<UnitValue value={temp.toFixed(1).toString()} unit="°C Ø" />}
          action={<Controls measure={measureTemp} />}
        />
        <DisplayRow
          label="Average Temperature"
          display={<UnitValue value={averageTemp.toFixed(1).toString()} unit="°C" />}
        />
        <DisplayRow
          label="Barometric Pressure"
          display={<UnitValue value={bar.toFixed(0).toString()} unit="mbar" />}
          action={<Controls measure={measureBar} />}
        />
        <DisplayRow label="Barometric Pressure Trend" display={<TrendValue trend={trend} measurements={measurements}/>} />
      </div>
    </div>
  );
}

export default App;
