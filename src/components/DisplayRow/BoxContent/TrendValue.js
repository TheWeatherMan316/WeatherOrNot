import React, { Fragment } from "react";
import fallIcon from "./fall.png";
import stableIcon from "./stable.png";
import riseIcon from "./rise.png";

export default function TrendValue(props) {
  let icon;

  if (props.trend === "rising") {
    icon = riseIcon;
  }
  if (props.trend === "stable") {
    icon = stableIcon;
  }
  if (props.trend === "falling") {
    icon = fallIcon;
  }

  return (
    <Fragment>
      <img className="arrow" src={icon} alt="arrow"></img>
      <p className="trendText">
        <b>{props.trend}</b>
      </p>
    </Fragment>
  );
}
