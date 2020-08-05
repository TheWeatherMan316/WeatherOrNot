const express = require("express");
const app = express();
const port = 4200;
const temperatureMeasurements = [{ value: 10, time: new Date() }];

setInterval(() => {
    const newTemperatureMeasurement = {
        value: 15,
        time: new Date(),
      };
      temperatureMeasurements.push(newTemperatureMeasurement);
}, 2000)

app.get("/api/temperatures", (req, res) => {
  console.log("got request");
  res.json(temperatureMeasurements);
});

app.post("/api/readTemperature", (req, res) => {
  console.log("got request to read temperature");
  const newTemperatureMeasurement = {
    value: 15,
    time: new Date(),
  };
  temperatureMeasurements.push(newTemperatureMeasurement);
  res.send()
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
