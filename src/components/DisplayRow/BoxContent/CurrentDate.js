import React, { useState, useEffect } from "react";

export default function CurrentDate() {
  useEffect(() => {
    setInterval(() => {
      let today = new Date().toLocaleDateString("de-DE");
      setDate(today);
    }, 60000);
  }, []);

  const [date, setDate] = useState(new Date().toLocaleDateString("de-DE"));

  return (
    <p>
      <b>{date}</b>
    </p>
  );
}
