export async function getWeatherApi(location) {
  //* Fetches weather api from visual crossing web server
  const resolved = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L`);
  const resolvedData = await resolved.json();
  return resolvedData;
}

// Formats wether api promise data in to readable obj
export async function formatWeatherData(apiData) {
  const data = await apiData;
  console.log(apiData);
  const dataObj = {
    location: data.address,
    tempF: data.currentConditions.temp + 'F',
    tempC: Math.ceil((data.currentConditions.temp - 32) * 5 / 9) + 'C',
    windspeed: Math.ceil(data.currentConditions.windspeed * 1.60934) + ' Km/h',
    conditions: data.currentConditions.conditions,
    desc: data.description
  }
  return dataObj;
}
