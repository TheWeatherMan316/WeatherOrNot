import React from "react";
import hourGlass from "./hourglass.svg"

export default function UnitValue(props) {
  if (props.value === "NaN") {
     return (
      <>
      <img className="--Icon" src={hourGlass} alt=""/>
      <p className="trendText"><b>
      --
      </b>
      </p>
      </>
  );
  } else {
      return (
    <p>
      <b>
      {props.value} {props.unit}
      </b>
    </p>
  );
  }
 



}
