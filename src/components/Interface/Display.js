import React from "react";
import UnitValue from "./Display/UnitValue";
import TrendValue from "./Display/TrendValue";

export default function Display(props) {
  if (!props.trend) {
    return (
      <UnitValue value={props.value} unit={props.unit} />
    );
  } else {
    return <TrendValue trend={props.trend} />;
  }
}
