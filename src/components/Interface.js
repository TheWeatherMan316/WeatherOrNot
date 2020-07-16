import React from "react";
import Controls from "./Interface/Controls";
import Display from "./Interface/Display";
import Label from "./Interface/Label";

export default function Interface(props) {
  if (props.button === true){
  return (
    <div className="Interface">
      <Label label={props.label} />
      <Display display={props.display} unit={props.unit} trend={props.trend} />
      <Controls measure={props.measure} />
    </div>
  );} else {
    return (
      <div className="Interface">
        <Label label={props.label} />
        <Display display={props.display} unit={props.unit} trend={props.trend} tendency={props.tendency} />
        <div className="controls"></div>
      </div>);
  }
}
