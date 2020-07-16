import React from "react";

export default function Controls(props) {
  return (
    <div className="controls">
      <button type="button" onClick={props.measure}>
        measure
      </button>
    </div>
  );
}
