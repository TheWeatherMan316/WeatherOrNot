
import { temperatureMeasurements } from "./database.js";
import { barometricMeasurements } from "./database.js";
import { measureTemperature } from "./sensors/temperatureSensor.js";
import { measureBarometricPressure } from "./sensors/barometricSensor.js";
import express from "express";

export function getApiRoutes() {
  const router = express.Router();

  router.get("/api/temperatures", (req, res) => {
    res.json(temperatureMeasurements);
  });

  router.get("/api/readTemperature", (req, res) => {
    measureTemperature();
    res.json(temperatureMeasurements);
  });

  router.get("/api/pressures", (req, res) => {
    res.json(barometricMeasurements);
  });

  router.get("/api/readPressure", (req, res) => {
    measureBarometricPressure();
    res.json(barometricMeasurements);
  });

  return router
}
