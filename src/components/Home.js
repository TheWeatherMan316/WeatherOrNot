import React from "react";
import Header from "./Header";
import DisplayRow from "./DisplayRow";
import UnitValue from "./DisplayRow/BoxContent/UnitValue";
import AverageValue from "./DisplayRow/BoxContent/AverageValue";
import Controls from "./DisplayRow/Controls";
import CurrentDate from "./DisplayRow/BoxContent/CurrentDate";
import TrendValue from "./DisplayRow/BoxContent/TrendValue";
import { Link } from "react-router-dom";

export default function Home(props) {


  const temperature = () => props.temperatureMeasurements.length === 0? null : props.temperatureMeasurements[props.temperatureMeasurements.length - 1].value
  const barometricPressure = () => props.barometricMeasurements.length===0? null : props.barometricMeasurements[props.barometricMeasurements.length - 1].value

  function calcAverageTemperature(temperatureMeasurements) {
    let sum = 0;
    for (let i = 0; i < temperatureMeasurements.length; i++) {
      sum += temperatureMeasurements[i].value;
    }
    let averageTemperature = sum / temperatureMeasurements.length;
    return averageTemperature;
  }

  return (
    <div>
      <>
        <Header />
        <DisplayRow label="Time" display={<CurrentDate time={true} />} />
        <DisplayRow label="Date" display={<CurrentDate time={false} />} />
        <DisplayRow
          label="Temperature"
          display={<UnitValue value={temperature()} unit="°C" toFixed = {1} />}
          action={<Controls action={props.measureTemperature} buttonLabel="measure" />}
          history={
            <Link to="/temperature_history">
              <button className="button">History</button>
            </Link>
          }
        />
        <DisplayRow
          label="Average Temperature"
          display={<AverageValue value={calcAverageTemperature(props.temperatureMeasurements).toFixed(1)} unit="°C Ø" />}
        />
        <DisplayRow
          label="Barometric Pressure"
          display={<UnitValue value={barometricPressure()} unit="mbar"  toFixed = {1} />}
          action={<Controls action={props.measureBarometricPressure} buttonLabel="measure" />}
          history={
            <Link to="/barometric_history">
              <button className="button">History</button>
            </Link>
          }
        />
        <DisplayRow
          label="Barometric Pressure Trend"
          display={<TrendValue measurements={props.barometricMeasurements} />}
        />
      </>
    </div>
  );
}
