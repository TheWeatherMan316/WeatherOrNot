import React from "react";
import logo from "./logo2.svg";


export default function Header() {
  return (
    <div className="header">
      <h1>
        <i className="name">WeatherOrNot</i></h1>
        <img src={logo} className="logo" alt="logo"></img>
    </div>
  );
}
