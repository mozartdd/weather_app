import * as controlModule from './controls.js';

export async function getWeatherApi(location) {
  const resolved = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DUX8WLQUANH4ZKTHFG32ZK63L&lang=id`);
  const resolvedData = await resolved.json();
  return resolvedData;
}

// Formats wether api promise data in to obj
export function formatWeatherData(apiData) {
  const data = apiData;
  // Obj which stores data that will be displayed on screen
  const dataObj = {
    currentHrs: +data.currentConditions.datetime.split(':')[0],
    tempF: data.currentConditions.temp,
    tempC: controlModule.fahrenheitToCelsius(data.currentConditions.temp),
    conditions: data.currentConditions.conditions,
    resolvedAddress: data.resolvedAddress,
    timeZone: data.timezone,
    futureDays: data.days
  }
  return dataObj;
}

export async function apiChain(input) {
  const errorContainer = document.querySelector('[data-error]');
  const body = document.querySelector('main');
  const loadingIcon = document.querySelector('[data-loading-icon]');
  errorContainer.style.display = 'none';
  body.style.display = 'none';
  loadingIcon.style.display = 'block';
  try {
    const data = await getWeatherApi(input);
    errorContainer.style.display = 'none';
    const stored = formatWeatherData(data);
    controlModule.renderCurrentConditions(stored);
    controlModule.renderFutureConditions(stored);
  } catch(err) {
    errorContainer.style.display = 'block';
    console.error(err);
  }
  loadingIcon.style.display = 'none';
  body.style.display = 'flex';
}

apiChain('London')