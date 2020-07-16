import React from "react";
import Controls from "./DisplayRow/Controls";
import Display from "./DisplayRow/Display";
import Label from "./DisplayRow/Label";

export default function DisplayRow(props) {
  if (props.button === true){
  return (
    <div className="Interface">
      <Label label={props.label} />
      <Display value={props.value} unit={props.unit} />
      <Controls measure={props.measure} />
    </div>
  );} else {
    return (
      <div className="Interface">
        <Label label={props.label} />
        <Display value={props.value} unit={props.unit} trend={props.trend} />
        {props.display}
        <div className="controls"></div>
      </div>);
  }
}
