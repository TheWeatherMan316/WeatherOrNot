import React from "react";
import Controls from "./Interface/Controls";
import Display from "./Interface/Display";
import Label from "./Interface/Label";

export default function Interface(props) {
  return (
    <div>
      <Label />
      <Display temperature={props.temperature} />
      <Controls measure={props.measure} />
    </div>
  );
}
