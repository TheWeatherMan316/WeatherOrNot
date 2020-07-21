import React from "react";

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  const yy = today.getFullYear().toString().substring(2, 4);
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return (today = `${dd}.${mm}.${yy}`);
}

export default function UnitValue() {
  const today = getCurrentDate();

  return (
    <p>
      <b>{today}</b>
    </p>
  );
}
