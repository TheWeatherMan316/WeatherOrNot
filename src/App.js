import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Interface from "./components/Interface";

import "./App.css";
let tempArr = [];
let barArr = [0, 0];

function App() {
  // states
  const [temp, setTemp] = useState(0);
  const [bar, setBar] = useState(0);
  const [av, setAv] = useState(0);
  const [tend, setTend] = useState("stable");

  // simulation of temp measure
  let tempCalc = () => {
    setTemp(getRandomValue(-20, 40));
  };

  // simulation of bar measure
  let barCalc = () => {
    setBar(getRandomValue(980, 1050));
  };

  // Calculation of average temperature
  function averageCalc(temperature) {
    let latest = temperature;
    tempArr.push(latest);
    let sum = tempArr.reduce((a, b) => a + b, 0);

    let avTemp = sum / tempArr.length;

    setAv(avTemp);
  }

  // Calculation of barometric tendency
  function tendencyCalc(barometricPressure) {
    let latest = barometricPressure;
    barArr.push(latest);
    barArr.shift();
    let difference = barArr[1] - barArr[0];
    console.log(difference);

    if (difference >= 4) {
      setTend("rising");
    }
    if (difference < 4 && difference > -4) {
      setTend("stable");
    }
    if (difference < -4) {
      setTend("falling");
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
          display={temp.toFixed(1).toString()}
          measure={tempCalc}
          unit="°C"
          label="Temperature"
          button={true}
          trend={false}
        />
        <Interface
          display={av.toFixed(1).toString()}
          unit="°C Ø"
          label="Average Temperature"
          button={false}
          trend={false}
        />
        <Interface
          display={bar.toFixed(0).toString()}
          measure={barCalc}
          unit="mbar"
          label="Barometric Pressure"
          button={true}
          trend={false}
        />
        <Interface
          display={"falling"}
          unit=" "
          label="Barometric Pressure Trend"
          button={false}
          trend={true}
          tendency={tend}
        />
      </div>
      <p>{tend}</p>
    </div>
  );
}

export default App;
