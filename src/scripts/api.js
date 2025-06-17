async function getWetherApi(location='Moscow') {
  try {
    //* Fetches weather api from visual crossing web server
    const resolved = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L`
    );
    const resolvedData = await resolved.json();
    return resolvedData;
  } catch(err) {
    throw new Error(`Error: ${err}`);
  }
}

export async function storeWeatherData(location) {
  // Array to store wether api data
  let dataArray = [];
  try {
    const data = await getWetherApi(location);
    const dataObj = {
      location: data.address,
      tempF: data.currentConditions.temp,
      tempC: Math.ceil((data.currentConditions.temp - 32) * 5 / 9),
      conditions: data.currentConditions.conditions,
      desc: data.description
    }
    // Empty array before push new weather data
    dataArray = [];
    dataArray.push(dataObj);
    return dataArray;
  } catch(err) {
    throw new Error(`Error: ${err}`);
  }
}
