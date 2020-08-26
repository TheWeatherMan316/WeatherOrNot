import {measureTemperature} from "../sensors/temperatureSensor.js"
import {measureBarometricPressure} from "../sensors/barometricSensor.js"
import { saveTemperatureMeasurement, saveBarometricMeasurement } from "../database.js";

export function setBackgroundTasks() {
  setInterval(() => {
    saveTemperatureMeasurement(measureTemperature());
  }, 2000);

  setInterval(() => {
    saveBarometricMeasurement(measureBarometricPressure());
  }, 5000);
}
