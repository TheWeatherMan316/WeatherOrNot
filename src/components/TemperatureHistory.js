import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Routes from "../Routes";


export default function TemperatureHistory(props) {
  const [sortedField, setSortedField] = useState(null);
  
  const newArray = [];
  newArray.push(...props.temperatureMeasurements)
  let reversedArray = newArray.reverse();

  reversedArray.sort((a, b) => {
    if (a[sortedField] < b[sortedField]) {
      return 1;
    }
    if (a[sortedField] > b[sortedField]) {
      return -1;
    }
    return 0;
  });


  const temperatureHistory = reversedArray.map((element) => (
    <tr key={element.time}>
      <td>{element.time.toLocaleDateString("de-DE")}</td>
      <td>{element.time.toLocaleTimeString("de-DE")}</td>
      <td>{element.value.toFixed(1).toString()}°C</td>
    </tr>
  ));

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
                  onClick={() => setSortedField("time")}
                >
                  Time ↑
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="buttonTableSort"
                  onClick={() => setSortedField("value")}
                >
                  Measurement ↑
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