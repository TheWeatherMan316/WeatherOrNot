import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Interface from "./components/Interface";

import "./App.css";
let tempArr = [];
function App() {
  // states
  const [temp, setTemp] = useState(0);
  const [bar, setBar] = useState(0);
  const [av, setAv] = useState(0);

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
    console.log(tempArr);
    tempArr.push(latest);
    console.log(tempArr);
    let sum = tempArr.reduce((a, b) => a + b, 0);

    let avTemp = sum / tempArr.length;

    setAv(avTemp);
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
        />
        <Interface
          display={av.toFixed(1).toString()}
          unit="°C Ø"
          label="Average Temperature"
          button={false}
        />
        <Interface
          display={bar.toFixed(0).toString()}
          measure={barCalc}
          unit="mbar"
          label="Barometric Pressure"
          button={true}
        />
      </div>
    </div>
  );
}

export default App;
