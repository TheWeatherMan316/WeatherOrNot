import React, { Fragment } from "react";
import fallIcon from "./fall.svg";
import stableIcon from "./stable.svg";
import riseIcon from "./rise.svg";

function getCurrentTrend(measurements) {
  const pressureDifference = measurements[1].value - measurements[0].value;
  const timeDifference = measurements[1].timestamp - measurements[0].timestamp;

  const standardBarDiff = 10;
  const standardTimeDiff = 10000;
  const standardGradient = Math.abs(standardBarDiff / standardTimeDiff);
  // standardGradient now: 0.001

  const gradient = Math.abs(pressureDifference / timeDifference);

  if (pressureDifference >= 4 && gradient >= standardGradient) {
    return "rising";
  } else if (pressureDifference >= 4 && gradient < standardGradient) {
    return "stable";
  } else if (pressureDifference < 4 && pressureDifference > -4) {
    return "stable";
  } else if (pressureDifference <= -4 && gradient < standardGradient) {
    return "stable";
  } else if (pressureDifference <= -4 && gradient >= standardGradient) {
    return "falling";
  }
}

function getCurrentIcon(trend) {
  if (trend === "rising") {
    return riseIcon;
  }
  if (trend === "stable") {
    return stableIcon;
  }
  if (trend === "falling") {
    return fallIcon;
  }
}

export default function TrendValue(props) {
  const trend = getCurrentTrend(props.measurements);
  const icon = getCurrentIcon(trend);
  const className= `${trend}Icon`
  return (
    <Fragment>
      <img className={className} src={icon} alt="arrow"/>
      <p className="trendText">
        <b>{trend}</b>
      </p>
    </Fragment>
  );
}
