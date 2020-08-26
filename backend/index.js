import {temperatureMeasurements} from "./database.js";
import {barometricMeasurements} from "./database.js";
import {measureTemperature} from "./sensors/temperatureSensor.js"
import {measureBarometricPressure} from "./sensors/barometricSensor.js"
import express from "express";
import cors from "cors";
import fs from "fs";
const app = express(); // initialisierung
const port = 4200;

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}
// background tasks
setInterval(() => {
  measureTemperature();
}, 2000);

// background service
setInterval(() => {
  measureBarometricPressure();
}, 5000);
 
// Routen
app.use(cors());

app.get("/api/temperatures", (req, res) => {
  res.json(temperatureMeasurements);
});

app.get("/api/readTemperature", (req, res) => {
  measureTemperature();
  res.json(temperatureMeasurements);
});

app.get("/api/pressures", (req, res) => {
  res.json(barometricMeasurements);
});

app.get("/api/readPressure", (req, res) => {
  measureBarometricPressure();
  res.json(barometricMeasurements);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
