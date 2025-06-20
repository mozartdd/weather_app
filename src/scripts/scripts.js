export async function getWeatherApi(location) {
  const resolved = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L&lang=id`);
  const resolvedData = await resolved.json();
  return resolvedData;
}

// Formats wether api promise data in to obj
export async function formatWeatherData(apiData) {
  const data = apiData;
  // Obj which stores data that will be displayed on screen
  const dataObj = {
    location: data.address,
    tempF: data.currentConditions.temp,
    tempC: fahrenheitToCelsius(data.currentConditions.temp),
    metricWind: Math.ceil(data.currentConditions.windspeed * 1.60934) + ' km/ph',
    imperialWind: data.currentConditions.windspeed + ' m/ph',
    conditions: data.currentConditions.conditions,
    desc: data.description,
    resolvedAddress: data.resolvedAddress,
    timeZone: data.timezone,
    futureDays: data.days
  }
  return dataObj;
}

export function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * 5 / 9);
}