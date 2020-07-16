import React from "react";
import UnitValue from "./BoxContent/UnitValue";
import TrendValue from "./BoxContent/TrendValue";

export default function BoxContent(props) {
  return <div className="BoxContent">{props.display}</div>;
}
