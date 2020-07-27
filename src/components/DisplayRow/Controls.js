import React from "react";

export default function Controls(props) {
  return (
    <div className="controls">
      <button type="button" class="button" onClick={props.measure}>
        {props.buttonLabel}
      </button>
    </div>
  );
}
