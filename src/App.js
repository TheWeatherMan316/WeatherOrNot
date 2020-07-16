import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Interface from "./components/Interface";

import "./App.css";
let tempArr = [];
let barArr = [0, 0];
let barTimestampArr = [0, 0];

function App() {
  // states
  const [temp, setTemp] = useState(0);
  const [bar, setBar] = useState(0);
  const [average, setAverage] = useState(0);
  const [trend, setTrend] = useState("stable");

  let tempCalc = () => {
    setTemp(getRandomValue(-20, 40));
  };

  // simulation of bar measure
  let barCalc = () => {
    setBar(getRandomValue(980, 1050));
    let timestamp = Date.now();
      // Queue of timestamps
      barTimestampArr.push(timestamp);
      barTimestampArr.shift();
  };

  // Calculation of average temperature
  function averageCalc(temperature) {
    let latest = temperature;
    tempArr.push(latest);
    let sum = tempArr.reduce((a, b) => a + b, 0);

    let avTemp = sum / tempArr.length;

    setAverage(avTemp);
  }

  // Calculation of barometric tendency
  function tendencyCalc(barometricPressure) {
    // Queue of bar-values
    let latest = barometricPressure;
    barArr.push(latest);
    barArr.shift();
    
    let tempDifference = barArr[1] - barArr[0];
    let timeDifference = barTimestampArr[1] - barTimestampArr[0];

    // standard: 10 mbar per 10 seconds (10000ms) => rise: 0.001
    const standardBarDiff = 10;
    const standardTimeDiff = 10000;
    let standardGradient = Math.abs(standardBarDiff/standardTimeDiff);

    let gradient = Math.abs(tempDifference / timeDifference);
     console.log(gradient)
    
    if (tempDifference >= 4 && gradient >= standardGradient) {
      setTrend("rising");
    } else
    if (tempDifference >= 4 && gradient < standardGradient) {
      setTrend("stable");
    } else
    if (tempDifference < 4 && tempDifference > -4) {
      setTrend("stable");
    } else 
    if (tempDifference <= -4  && gradient < standardGradient) {
      setTrend("stable");
    } else 
    if (tempDifference <= -4  && gradient >= standardGradient) {
      setTrend("falling");
    }
  }

  // create random value
  function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  // timers for automatic measure
  useEffect(() => {
    setInterval(() => {
      tempCalc();
    }, 1000);
    setInterval(() => {
      barCalc();
    }, 5000);
  }, []);

  useEffect(() => {
    averageCalc(temp);
  }, [temp]);

  useEffect(() => {
    tendencyCalc(bar);
  }, [bar]);

  return (
    <div className="app" align="center">
      <div className="container">
        <Header />
        <Interface
          value={temp.toFixed(1).toString()}
          measure={tempCalc}
          unit="°C"
          label="Temperature"
          button={true}
        />
        <Interface
          value={average.toFixed(1).toString()}
          unit="°C Ø"
          label="Average Temperature"
          button={false}
        />
        <Interface
          value={bar.toFixed(0).toString()}
          measure={barCalc}
          unit="mbar"
          label="Barometric Pressure"
          button={true}
        />
        <Interface
          unit=" "
          label="Barometric Pressure Trend"
          button={false}
          trend={trend}
        />
      </div>
    </div>
  );
}

export default App;
