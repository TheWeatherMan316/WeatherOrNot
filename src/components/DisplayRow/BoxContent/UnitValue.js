import React from "react";
import hourGlass from "./hourglass.svg";

export default function UnitValue(props) {
  if (props.value === null) {
    return (
      <>
        <img className="--Icon" src={hourGlass} alt="" />
        <p className="trendText">
          <b>--</b>
        </p>
      </>
    );
  } else {
    return (
      <p>
        <b>
          {props.value.toFixed(props.toFixed)} {props.unit}
        </b>
      </p>
    );
  }
}
