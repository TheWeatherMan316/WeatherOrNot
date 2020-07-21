import React, { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("now it´s:");

  useEffect(() => {
    setInterval(() => {
      const today = new Date();
      const hours = today.getHours()<10 ? "0"+today.getHours() : today.getHours()
      const minutes = today.getMinutes()<10 ? "0"+today.getMinutes() : today.getMinutes()
      const seconds = today.getSeconds()<10 ? "0"+today.getSeconds() : today.getSeconds()
      const time = hours + ":" + minutes + ":" + seconds;
      setTime(time);
    }, 1000);
  }, []);

  return (
    <p>
      <b>{time}</b>
    </p>
  );
}
