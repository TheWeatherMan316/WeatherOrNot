import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarHistory from "./components/BarHistory"
import TempHistory from "./components/TempHistory"
import Home from "./components/Home"

const tempHistoryArr = [];

const barHistArr = [];

function App() {
  const [temp, setTemp] = useState(0);
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

  function calcAverageTemp() {
    let sum = 0;
    for (let i = 0; i < tempHistoryArr.length; i++) {
      sum += tempHistoryArr[i].value;
    }
    let averageTemp = sum / tempHistoryArr.length;
    return averageTemp;
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
          <Switch>
            <Route path="/tempHist"><TempHistory tempHistoryArr={tempHistoryArr} /></Route>
            <Route path="/barHist"><BarHistory barHistArr={barHistArr} /></Route>
            <Route path="/home">< Home temp={temp} measureTemp={measureTemp} calcAverageTemp={calcAverageTemp} bar={bar} measureBar={measureBar} barHistArr={barHistArr}/></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

