import React, { useState } from "react";
import Header from "./components/Header";
import Interface from "./components/Interface";

import "./App.css";

function App() {
  const [temp, setTemp] = useState("--");
  const [bar, setBar] = useState("--");

  let tempCalc = () => {
    setTemp(getRandomValue(-20, 40, 1));
  };

  let barCalc = () => {
    setBar(getRandomValue(980, 1050, 0));
  };

  function getRandomValue(min, max, precision) {
    return (Math.random() * (max - min) + min).toFixed(precision).toString();
  }

  return (
    <div className="app" align="center">
      <div className="container">
        <Header />
        <Interface display={temp} measure={tempCalc} unit="°C" label="Temperature" />
        <Interface display={bar} measure={barCalc} unit="mbar" label="Barometric Pressure" />
        {console.log(temp)}
      </div>
    </div>
  );
}

export default App;
