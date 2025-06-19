import moment from 'moment-timezone';

const domContainers = {
  // Panel dom elements
  panelLocation: document.querySelector('[data-panel-location]'),
  panelTime: document.querySelector('[data-panel-time]'),
}

// Receives data as promise obj and displays it on screen trough DOM elements
export async function displayData(stored) {
  let isCelsius = true;
  for (const [key, value] of Object.entries(stored)) {
    console.log(`${key}: ${value}`);
  }
  domContainers.panelLocation.textContent = stored.resolvedAddress;
  domContainers.panelTime.textContent = moment().tz(stored.timeZone).format('MMMM Do, h:mm a');
}