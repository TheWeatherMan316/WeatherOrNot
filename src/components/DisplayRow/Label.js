import React from "react";

export default function Label(props) {
  return (
    <div className="label">
      <p>
        <i>{props.label}:</i>
      </p>
    </div>
  );
}
