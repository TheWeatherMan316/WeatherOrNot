import {measureTemperature} from "../sensors/temperatureSensor.js"
import {measureBarometricPressure} from "../sensors/barometricSensor.js"

export function setBackgroundTasks() {
  setInterval(() => {
    measureTemperature();
  }, 2000);

  setInterval(() => {
    measureBarometricPressure();
  }, 5000);
}
