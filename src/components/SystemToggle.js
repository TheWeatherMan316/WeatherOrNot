import React from "react";

export default function SystemToggle(props) {
    if (props.system === "metric"){return (
        <div className="toggle-container" align="right">
            <button type="button" className="toggle-button-active">Metric</button>
            <button type="button" className="toggle-button-inactive" onClick={props.action}>Imperial</button>
        </div>
    )} else if (props.system === "imperial"){return (
        <div className="toggle-container" align="right">
            <button type="button" className="toggle-button-inactive" onClick={props.action}>Metric</button>
            <button type="button" className="toggle-button-active">Imperial</button>
        </div>
    )}
}