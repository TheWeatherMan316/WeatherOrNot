import getRandomValue from "./simulator.js"


export function measureBarometricPressure() {
    const newPressure = getRandomValue(980, 1050);
    // const inchMercury = newPressure*0.029530;
    const measurementTime = new Date();
    const latestMeasurement = {
      value: newPressure,
      // valueImperial: inchMercury,
      time: measurementTime
    };
    return latestMeasurement;
  }