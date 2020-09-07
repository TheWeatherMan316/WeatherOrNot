import getRandomValue from "./simulator.js";

export function measureTemperature() {
  const newTemperature = getRandomValue(-20, 40);
  // const fahrenheit = 1.8 * newTemperature + 32;
  const measurementTime = new Date();
  const latestMeasurement = {
    value: newTemperature,
    // valueImperial: fahrenheit,
    time: measurementTime
  };
  return latestMeasurement;
}
