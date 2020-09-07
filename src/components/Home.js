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
  const temperatureUnit = props.system === "metric" ? "°C" : "°F";
  const pressureUnit = props.system === "metric" ? "mbar" : "inHg";
  function barometricValue() {
    if (props.system === "metric") {
      return props.barometricMeasurements[props.barometricMeasurements.length - 1].value;
    } else {
      const valueMetric =
        props.barometricMeasurements[props.barometricMeasurements.length - 1].value;
      const valueImperial = valueMetric * 0.02953;
      return valueImperial;
    }
  }

  function temperatureValue(index) {
    if (props.system === "metric") {
      return props.temperatureMeasurements[index].value;
    } else {
      const valueMetric =
        props.temperatureMeasurements[props.temperatureMeasurements.length - 1].value;
      const valueImperial = 1.8 * valueMetric + 32;
      return valueImperial;
    }
  }

  const temperature =
    props.temperatureMeasurements.length === 0
      ? null
      : temperatureValue(props.temperatureMeasurements.length - 1);
  const barometricPressure = props.barometricMeasurements.length === 0 ? null : barometricValue();

  function calcAverageTemperature(temperatureMeasurements) {
    if (props.system === "metric") {
      let sum = 0;
      for (let i = 0; i < temperatureMeasurements.length; i++) {
        sum += temperatureMeasurements[i].value;
      }
      let averageTemperature = sum / temperatureMeasurements.length;
      return averageTemperature;
    } else {
      let sum = 0;
      for (let i = 0; i < temperatureMeasurements.length; i++) {
        sum += temperatureValue(i);
      }
      let averageTemperature = sum / temperatureMeasurements.length;
      return averageTemperature;
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
          display={<UnitValue value={temperature} unit={temperatureUnit} toFixed={1} />}
          action={<Controls action={props.onMeasureTemperatureClicked} buttonLabel="measure" />}
          history={
            <Link to="/temperature_history">
              <button className="button">History</button>
            </Link>
          }
        />
        <DisplayRow
          label="Average Temperature"
          display={
            <AverageValue
              value={calcAverageTemperature(props.temperatureMeasurements).toFixed(1)}
              unit="°C Ø"
            />
          }
        />
        <DisplayRow
          label="Barometric Pressure"
          display={<UnitValue value={barometricPressure} unit={pressureUnit} toFixed={1} />}
          action={
            <Controls action={props.onMeasureBarometricPressureClicked} buttonLabel="measure" />
          }
          history={
            <Link to="/barometric_history">
              <button className="button">History</button>
            </Link>
          }
        />
        <DisplayRow
          label="Barometric Pressure Trend"
          display={<TrendValue measurements={props.barometricMeasurements} system={props.system} />}
        />
      </>
    </div>
  );
}
