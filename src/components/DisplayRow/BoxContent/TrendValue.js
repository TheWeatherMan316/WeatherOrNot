import React, { Fragment } from "react";
import fallIcon from "./fall.svg";
import stableIcon from "./stable.svg";
import riseIcon from "./rise.svg";

function getCurrentTrend(barHistory) {
  const pressureDifference = barHistory[barHistory.length - 1].value - barHistory[barHistory.length - 2].value;
  const timeDifference = barHistory[barHistory.length - 1].time - barHistory[barHistory.length - 2].time;


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
