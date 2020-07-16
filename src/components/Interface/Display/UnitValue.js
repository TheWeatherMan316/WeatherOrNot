import React from "react";

export default function UnitValue(props) {

    return (
      <div className="display">
        <p>
          <b>
            {props.value} {props.unit}
          </b>
        </p>
      </div>
    );

}
