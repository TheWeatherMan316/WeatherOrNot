import React from "react";
import logo from "./logo.png";


export default function Header() {
  return (
    <div className="header">
      <h1>
        <i className="name">WeatherOrNot</i>
        <img src={logo} className="logo" alt="logo"></img>
      </h1>
    </div>
  );
}
