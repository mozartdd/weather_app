const dataArray = [];

async function getWetherApi(location='Moscow') {
  try {
    const resolved = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L`
    );
    const resolvedData = await resolved.json();
    return resolvedData;
  } catch(err) {
    throw new Error(err);
  }
}

async function storeWeatherData() {
  try {
    const data = await getWetherApi();
    const dataObj = {
      location: data.address,
      tempF: data.currentConditions.temp,
      tempC: Math.ceil((data.currentConditions.temp - 32) * 5 / 9)
    }
    dataArray.push(dataObj);
    console.log(data);
    console.log(dataArray);
    return dataArray;
  } catch(err) {
    throw new Error(err);
  }
}

storeWeatherData()