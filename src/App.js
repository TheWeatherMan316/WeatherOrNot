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

function App() {
 
  const [temp, setTemp] = useState(0);
  const [bar, setBar] = useState(0);
  const [averageTemp, setAverageTemp] = useState(0);
  const [trend, setTrend] = useState("stable");

  let measureTemp = () => {
    setTemp(getRandomValue(-20, 40));
  };

  let measureBar = () => {
    setBar(getRandomValue(980, 1050));
    let timestamp = Date.now();
    barTimestampArr.push(timestamp);
    barTimestampArr.shift();
  };

  function calcAverageTemp(temperature) {
    let latest = temperature;
    tempArr.push(latest);
    let sum = tempArr.reduce((a, b) => a + b, 0);

    let averageTemp = sum / tempArr.length;

    setAverageTemp(averageTemp);
  }

  function calcBarTrend(barometricPressure) { 

    let latest = barometricPressure;
    barArr.push(latest);
    barArr.shift();

    let tempDifference = barArr[1] - barArr[0];
    let timeDifference = barTimestampArr[1] - barTimestampArr[0];

    
    const standardBarDiff = 10;
    const standardTimeDiff = 10000;
    let standardGradient = Math.abs(standardBarDiff / standardTimeDiff);
    // standardGradient: 0.001
    
    let gradient = Math.abs(tempDifference / timeDifference);

    if (tempDifference >= 4 && gradient >= standardGradient) {
      setTrend("rising");
    } else if (tempDifference >= 4 && gradient < standardGradient) {
      setTrend("stable");
    } else if (tempDifference < 4 && tempDifference > -4) {
      setTrend("stable");
    } else if (tempDifference <= -4 && gradient < standardGradient) {
      setTrend("stable");
    } else if (tempDifference <= -4 && gradient >= standardGradient) {
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

  // useEffect -> arrays, später gemeinsames Objekt in Array



  useEffect(() => {
    calcAverageTemp(temp);
  }, [temp]);

  useEffect(() => {
    calcBarTrend(bar);
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
          action={<div className="controls"></div>}
        />
        <DisplayRow
          label="Barometric Pressure"
          display={<UnitValue value={bar.toFixed(0).toString()} unit="mbar" />}
          action={<Controls measure={measureBar} />}
        />
        <DisplayRow
          label="Barometric Pressure Trend"
          display={<TrendValue trend={trend} />}
          action={<div className="controls"></div>}
        />
      </div>
    </div>
  );
}

export default App;
