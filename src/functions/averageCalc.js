function averageCalc(temperature) {
    let latest = temperature;
    console.log(tempArr);
    tempArr.push(latest);
    console.log(tempArr);
    let sum = tempArr.reduce((a, b) => a + b, 0);

    let avTemp = sum / tempArr.length;

    setAv(avTemp);
  }