import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "./Header"

export default function BarHistory(props) {
  const barHistory = props.barHistArr.map((element) => (
    <Fragment>
      <tr key={element.time}>
        <td>{element.time.toLocaleDateString("de-DE")}</td>
        <td>{element.time.toLocaleTimeString("de-DE")}</td>
        <td>{element.value.toFixed(0).toString()} mBar</td>
      </tr>
    </Fragment>
  ));

  return (
    <>
    <Header />
    <div className="history">
      <Link to="/home">
        <button className="button">Back</button>
      </Link>
      <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Measurement</th>
        </tr>
        {barHistory}
      </table>
    </div>
    </>
  );
}
