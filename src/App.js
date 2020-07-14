import React, { useState } from "react";
import Header from "./components/Header";
import TempInterface from "./components/TempInterface";
import BarInterface from "./components/BarInterface";

import "./App.css";

function App() {
  const [temp, setTemp] = useState("--");
  const [bar, setBar] = useState("--");

  let tempCalc = () => {
    setTemp((Math.random() * (40 - -20) + -20).toFixed(1).toString());
  };

  let barCalc = () => {
    setBar((Math.random() * (1050 - 980) + 980).toFixed(0).toString());
  };

  return (
    <div className="app" align="center">
      <div className="container">
        <Header />
        <TempInterface display={temp} measure={tempCalc} label="Temperature" />
        <BarInterface display={bar} measure={barCalc} label="Barometric Pressure" />
        {console.log(temp)}
      </div>
    </div>
  );
}

export default App;
