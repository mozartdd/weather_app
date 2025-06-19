import moment from 'moment-timezone';

const domContainers = {
  // Panel dom elements
  panelLocation: document.querySelector('[data-panel-location]'),
  panelTime: document.querySelector('[data-panel-time]'),
  currentTemp: document.querySelector('[data-current-temp]'),
}

// Todo: Download svg icons for each type
const weatherIcons = {
  type_43: "icons/clear.svg",         // Clear
  type_42: "icons/cloudy.svg",        // Partially Cloudy
  type_21: "icons/rain.svg",          // Rain
  type_31: "icons/snow.svg",          // Snow
  type_37: "icons/thunder.svg",       // Thunderstorm
  type_12: "icons/fog.svg"            // Freezing Fog / Fog
};

// Receives data as promise obj and displays it on screen trough DOM elements
export async function displayData(stored) {
  let isCelsius = true;
  for (const [key, value] of Object.entries(stored)) {
    console.log(`${key}: ${value}`);
  }
  domContainers.panelLocation.textContent = stored.resolvedAddress;
  domContainers.panelTime.textContent = moment().tz(stored.timeZone).format('MMMM Do, h:mm a');
  domContainers.currentTemp.textContent = isCelsius ? stored.tempC : stored.tempF;
}