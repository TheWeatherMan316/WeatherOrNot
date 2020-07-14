import React from "react";
import Controls from "./Interface/Controls";
import Display from "./Interface/Display";
import Label from "./Interface/Label";

export default function TempInterface(props) {
  return (
    <div className="Interface" id="temp">
      <Label label={props.label}/>
      <Display display={props.display} unit="°C" />
      <Controls measure={props.measure} />
    </div>
  );
}
