import React from "react";
import fallIcon from "./fall.png";
import stableIcon from "./stable.png";
import riseIcon from "./rise.png";

export default function Display(props) {
  // Set Icon

  let icon;
  if (props.tendency === "rising") {
    icon = riseIcon;
  }
  if (props.tendency === "stable") {
    icon = stableIcon;
  }
  if (props.tendency === "falling") {
    icon = fallIcon;
  }

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
      <div className="display" id="trend">
          <img className="arrow" src={icon} alt="arrow"></img>
          <p className="tendencyText"><b>{props.tendency}</b></p>
      </div>
    );
  }
}
