import React from "react";
import Header from "./components/Header";
import Label from "./components/Interface/Label";
import Display from "./components/Interface/Display";
import Controls from "./components/Interface/Controls";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      temperature: "--",
    };
    this.setTemp = this.setTemp.bind(this);
  }

  setTemp = () => {
    let min = -20;
    let max = 40;
    let randNum = (Math.random() * (max - min) + min).toFixed(1).toString();
    this.setState((prevTemp) => {
      return { temperature: randNum };
    });
  };

  render() {
    return (
      <div className="app" align="center">
        <div className="container">
          <Header />
          <Label />
          <Display temperature={this.state.temperature} />
          <Controls measure={this.setTemp} />
        </div>
      </div>
    );
  }
}

export default App;
