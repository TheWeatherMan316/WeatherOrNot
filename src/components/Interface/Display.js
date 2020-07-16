import React from "react";

export default function Display(props) {
  if (props.trend === false) {
    return (
      <div className="display">
        <p>
          <b>
            {props.display} {props.unit}
          </b>
        </p>
      </div>
    );
  } else {
    return (
      <div className="display">
        <p>
          <b>{props.tendency}</b>
        </p>
      </div>
    );
  }
}
