import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function BarometricHistory(props) {
  const [sortedField, setSortedField] = useState(null);

  const [...values] = props.barometricMeasurements;
  let sortedArray = [...values];
  let reversedArray = sortedArray.reverse();

  reversedArray.sort((a, b) => {
    if (a[sortedField] < b[sortedField]) {
      return 1;
    }
    if (a[sortedField] > b[sortedField]) {
      return -1;
    }
    return 0;
  });
  const barometricHistory = reversedArray.map((element) => (
    <>
      <tr key={element.time}>
        <td>{element.time.toLocaleDateString("de-DE")}</td>
        <td>{element.time.toLocaleTimeString("de-DE")}</td>
        <td>{element.value.toFixed(0).toString()} mBar</td>
      </tr>
    </>
  ));

  return (
    <>
      <Header />
      <div className="history">
        <Link to="/home">
          <button className="button">Back</button>
        </Link>
        <h3 className="headings">Barometric Pressure History</h3>
        <table>
          <tr>
            <th>Date</th>
            <th>
              {" "}
              <button
                type="button"
                className="buttonTableSort"
                onClick={() => setSortedField("time")}
              >
                Time ↑
              </button>
            </th>
            <th>
              {" "}
              <button
                type="button"
                className="buttonTableSort"
                onClick={() => setSortedField("value")}
              >
                Measurement ↑
              </button>
            </th>
          </tr>
          {barometricHistory}
        </table>
      </div>
    </>
  );
}
