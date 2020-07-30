import React from "react";
import Header from "./Header";
import DisplayRow from "./DisplayRow";
import UnitValue from "./DisplayRow/BoxContent/UnitValue";
import Controls from "./DisplayRow/Controls";
import CurrentDate from "./DisplayRow/BoxContent/CurrentDate";
import TrendValue from "./DisplayRow/BoxContent/TrendValue";
import { Link } from "react-router-dom";


export default function Home(props) {

  function checkIfBarIsZero(bar) {
  if (bar === 0) {
    return "NaN"
  } else {
    return bar.toFixed(0).toString()
}
}

function checkIfTempIsZero(temp) {
  if (temp === 0) {
    return "NaN"
  } else {
    return temp.toFixed(1).toString()
}
}

  return (
    <div>
      <>
        <Header />
        <DisplayRow label="Time" display={<CurrentDate time={true} />} />
        <DisplayRow label="Date" display={<CurrentDate time={false} />} />
        <DisplayRow
          label="Temperature"
          display={<UnitValue value={checkIfTempIsZero(props.temp)} unit="°C" />}
          action={<Controls action={props.measureTemp} buttonLabel="measure" />}
          history={
            <Link to="/tempHist">
              <button className="button">History</button>
            </Link>
          }
        />
        <DisplayRow
          label="Average Temperature"
          display={<UnitValue value={props.calcAverageTemp().toFixed(1)} unit="°C Ø" />}
        />
        <DisplayRow
          label="Barometric Pressure"
          display={<UnitValue value={checkIfBarIsZero(props.bar)} unit="mbar" />}
          action={<Controls action={props.measureBar} buttonLabel="measure" />}
          history={
            <Link to="/barHist">
              <button className="button">History</button>
            </Link>
          }
        />
        <DisplayRow
          label="Barometric Pressure Trend"
          display={<TrendValue measurements={props.barHistArr} />}
        />
      </>
    </div>
  );
}
