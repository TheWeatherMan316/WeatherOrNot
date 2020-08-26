import getRandomValue from "./simulator.js"
import { saveBarometricMeasurement } from "../database.js";

export function measureBarometricPressure() {
    const newPressure = getRandomValue(980, 1050);
    const measurementTime = new Date();
    const latestMeasurement = {
      value: newPressure,
      time: measurementTime,
    };
    saveBarometricMeasurement(latestMeasurement);
  }