import React from "react";
import BoxContent from "./DisplayRow/BoxContent";
import Label from "./DisplayRow/Label";

export default function DisplayRow(props) {
  return (
    <div className="DisplayRow">
      <Label label={props.label} />
      <BoxContent display={props.display} />
      {props.action}
      {props.history}
    </div>
  );
}
