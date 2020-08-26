import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Routes from "../Routes";

export default function TemperatureHistory(props) {
  // eslint-disable-next-line
  const [sortedField, setSortedField] = useState("time");
  const [sortingDirection, setSortingDirection] = useState("desc");

  const newArray = [...props.temperatureMeasurements];
  const valueToSortBy = props.system === "metric" ? "valueMetric" : "valueImperial";

  newArray.sort((a, b) => {
    if (a[sortedField] < b[sortedField]) {
      if (sortingDirection === "desc") {
        return 1;
      } else if (sortingDirection === "asc") {
        return -1;
      }
    }
    if (a[sortedField] > b[sortedField]) {
      if (sortingDirection === "desc") {
        return -1;
      } else if (sortingDirection === "asc") {
        return 1;
      }
    }
    return 0;
  });

  const temperatureHistory =
    props.system === "metric"
      ? newArray.map((element) => (
          <tr key={newArray.indexOf(element)}>
            <td>{element.time.toLocaleDateString("de-DE")}</td>
            <td>{element.time.toLocaleTimeString("de-DE")}</td>
            <td>{element.valueMetric.toFixed(1).toString()}°C</td>
          </tr>
        ))
      : newArray.map((element) => (
          <tr key={newArray.indexOf(element)}>
            <td>{element.time.toLocaleDateString("de-DE")}</td>
            <td>{element.time.toLocaleTimeString("de-DE")}</td>
            <td>{element.valueImperial.toFixed(1).toString()}°F</td>
          </tr>
        ));

  function switchSortingDirection() {
    if (sortingDirection === "desc") {
      setSortingDirection("asc");
    } else if (sortingDirection === "asc") {
      setSortingDirection("desc");
    }
  }

  return (
    <>
      <Header />
      <div className="history">
        <Link to={Routes.home}>
          <button className="button">Back</button>
        </Link>
        <h3 className="headings">Temperature History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>
                <button
                  type="button"
                  className="buttonTableSort"
                  onClick={() => {
                    setSortedField("time");
                    switchSortingDirection();
                  }}
                >
                  Time ↕
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="buttonTableSort"
                  onClick={() => {
                    setSortedField(valueToSortBy);
                    switchSortingDirection();
                  }}
                >
                  Measurement ↕
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{temperatureHistory}</tbody>
        </table>
      </div>
    </>
  );
}
