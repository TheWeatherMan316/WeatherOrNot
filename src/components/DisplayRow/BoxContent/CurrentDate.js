import React, { useState, useEffect } from "react";

export default function CurrentDate(props) {

  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    setInterval(() => {
      let today = new Date();
      setDate(today);
    }, 1000);
  }, []);

  return (
    <p>
      <b>{props.time === true ? date.toLocaleTimeString("de-DE"): date.toLocaleDateString("de-DE")}</b>
    </p>
  );
}
