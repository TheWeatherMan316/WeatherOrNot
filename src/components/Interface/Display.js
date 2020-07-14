import React from "react";

export default function Display(props) {
  return (
    <div className="display">
      <p>
        <b>{props.temperature}°C</b>
      </p>
    </div>
  );
}
