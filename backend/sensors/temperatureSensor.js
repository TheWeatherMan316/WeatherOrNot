import getRandomValue from "./simulator.js"
import {saveTemperatureMeasurement} from "../database.js"

export function measureTemperature() {
    const newTemperature = getRandomValue(-20, 40);
    const measurementTime = new Date();
    const latestMeasurement = {
      value: newTemperature,
      time: measurementTime,
    };
    saveTemperatureMeasurement(latestMeasurement)
  }