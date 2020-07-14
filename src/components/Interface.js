import React from "react";
import Controls from "./Interface/Controls";
import Display from "./Interface/Display";
import Label from "./Interface/Label";

export default function Interface(props) {
  return (
    <div className="Interface">
      {console.log(" got rerendered")}
      <Label label={props.label} />
      <Display display={props.display} unit={props.unit} />
      <Controls measure={props.measure} />
    </div>
  );
}
