import React from "react";
import Controls from "./DisplayRow/Controls";
import BoxContent from "./DisplayRow/BoxContent";
import Label from "./DisplayRow/Label";

export default function DisplayRow(props) {
  return (
    <div className="DisplayRow">
      <Label label={props.label} />
      <BoxContent display={props.display} />
      {/* <div className="controls"></div> */}
      {props.action}
    </div>
  );
}
