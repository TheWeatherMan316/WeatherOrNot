import React, { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("now it´s:");

  useEffect(() => {
    setInterval(() => {
      const time = new Date().toLocaleTimeString("de-DE");
      setTime(time);
    }, 1000);
  }, []);

  return (
    <p>
      <b>{time}</b>
    </p>
  );
}
