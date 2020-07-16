import React from "react";
import UnitValue from "./BoxContent/UnitValue";
import TrendValue from "./BoxContent/TrendValue";

export default function BoxContent(props) {
  if (!props.trend) {
    return (
      <UnitValue value={props.value} unit={props.unit} />
    );
  } else {
    return <TrendValue trend={props.trend} />;
  }
}
