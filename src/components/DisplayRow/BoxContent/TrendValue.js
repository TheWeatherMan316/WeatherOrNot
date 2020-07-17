import React, { Fragment } from "react";
import fallIcon from "./fall.png";
import stableIcon from "./stable.png";
import riseIcon from "./rise.png";

export default function TrendValue(props) {
  let trend = "stable";

  const measurements = props.measurements;

  const pressureDifference = measurements[1].value - measurements[0].value;
  const timeDifference = measurements[1].timestamp - measurements[0].timestamp;

  const standardBarDiff = 10;
  const standardTimeDiff = 10000;
  const standardGradient = Math.abs(standardBarDiff / standardTimeDiff);
  // standardGradient now: 0.001

  const gradient = Math.abs(pressureDifference / timeDifference);

  if (pressureDifference >= 4 && gradient >= standardGradient) {
    trend = "rising";
  } else if (pressureDifference >= 4 && gradient < standardGradient) {
    trend = "stable";
  } else if (pressureDifference < 4 && pressureDifference > -4) {
    trend = "stable";
  } else if (pressureDifference <= -4 && gradient < standardGradient) {
    trend = "stable";
  } else if (pressureDifference <= -4 && gradient >= standardGradient) {
    trend = "falling";
  }

  let icon;

  if (trend === "rising") {
    icon = riseIcon;
  }
  if (trend === "stable") {
    icon = stableIcon;
  }
  if (trend === "falling") {
    icon = fallIcon;
  }

  return (
    <Fragment>
      <img className="arrow" src={icon} alt="arrow"></img>
      <p className="trendText">
        <b>{trend}</b>
      </p>
    </Fragment>
  );
}
