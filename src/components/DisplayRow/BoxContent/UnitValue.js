import React from "react";

export default function UnitValue(props) {
  return (
    <p>
      <b>
        {props.value} {props.unit}
      </b>
    </p>
  );
}
