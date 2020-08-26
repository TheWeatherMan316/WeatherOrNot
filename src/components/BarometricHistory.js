import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Routes from "../Routes";

export default function BarometricHistory(props) {
  const [sortedField, setSortedField] = useState(null);
  const [sortingDirection, setSortingDirection] = useState("desc");

  const newArray = [];
  newArray.push(...props.barometricMeasurements);
  let reversedArray = newArray.reverse();

  reversedArray.sort((a, b) => {
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

  const barometricHistory = reversedArray.map((element) => (
    <tr key={reversedArray.indexOf(element)}>
      <td>{element.time.toLocaleDateString("de-DE")}</td>
      <td>{element.time.toLocaleTimeString("de-DE")}</td>
      <td>{element.value.toFixed(0).toString()} mBar</td>
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
        <h3 className="headings">Barometric Pressure History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>
                {" "}
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
                {" "}
                <button
                  type="button"
                  className="buttonTableSort"
                  onClick={() => {
                    setSortedField("value");
                    switchSortingDirection();
                  }}
                >
                  Measurement ↕
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{barometricHistory}</tbody>
        </table>
      </div>
    </>
  );
}
