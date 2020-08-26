import fs from "fs";

export const temperatureMeasurements = fs.existsSync("./data/temperatureMeasurements.json")
  ? JSON.parse(fs.readFileSync("./data/temperatureMeasurements.json"))
  : [];
export const barometricMeasurements = fs.existsSync("./data/barometricMeasurements.json")
  ? JSON.parse(fs.readFileSync("./data/barometricMeasurements.json"))
  : [];

  export function saveTemperatureMeasurement (latestMeasurement) {
    temperatureMeasurements.push(latestMeasurement);
    const temperatureJSON = JSON.stringify(temperatureMeasurements);
    fs.writeFileSync("./data/temperatureMeasurements.json", temperatureJSON);
  }

  export function saveBarometricMeasurement(latestMeasurement) {
    barometricMeasurements.push(latestMeasurement);
    const barometricJSON = JSON.stringify(barometricMeasurements);
    fs.writeFileSync("./data/barometricMeasurements.json", barometricJSON);
  }