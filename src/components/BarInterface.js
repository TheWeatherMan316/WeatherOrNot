import React from "react";
import Controls from "./Interface/Controls";
import Display from "./Interface/Display";
import Label from "./Interface/Label";

export default function BarInterface(props) {
  return (
    <div className="Interface" id="bar">
      <Label label={props.label} />
      <Display display={props.display} unit="mbar" />
      <Controls measure={props.measure} />
    </div>
  );
}
