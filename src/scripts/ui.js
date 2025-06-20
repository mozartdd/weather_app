import moment from 'moment-timezone';
import { fahrenheitToCelsius } from './scripts';
let isCelsius = true;

// If isCelsius display temp in celsius else in F 
function displayCorrectTempUnit(c , f, element) {
  element.textContent = isCelsius ? c + '°C' : f + '°F';
}

// This object holds dom elements which are containers for storing weather data 
const dynamicDom = {
  currentLocation: document.querySelector('[data-panel-location]'),
  currentTime: document.querySelector('[data-panel-time]'),
  currentTemp: document.querySelector('[data-current-temp]'),
  tempBtn: document.querySelectorAll('[data-temp-btn]'),
  futureTemp: document.querySelectorAll('[data-future-temp]'),
  futureDay: document.querySelectorAll('[data-week-day]'),
}
// Todo: Download svg icons for each type
// const weatherIcons = {
//   type_43: "icons/clear.svg",         // Clear
//   type_42: "icons/cloudy.svg",        // Partially Cloudy
//   type_21: "icons/rain.svg",          // Rain
//   type_31: "icons/snow.svg",          // Snow
//   type_37: "icons/thunder.svg",       // Thunderstorm
//   type_12: "icons/fog.svg"            // Freezing Fog / Fog
// };

//Todo: Add bool values for daytime, create && statement which will
//Todo: look at daytime and weather type and display correct icon

// Receives data as obj and displays current conditions
export async function renderCurrentConditions(stored) {
  dynamicDom.currentLocation.textContent = stored.resolvedAddress;
  dynamicDom.currentTime.textContent = moment().tz(stored.timeZone).format('MMMM Do, h:mm a');
  displayCorrectTempUnit(stored.tempC, stored.tempF, dynamicDom.currentTemp);

  dynamicDom.tempBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      isCelsius = !isCelsius;
      displayCorrectTempUnit(stored.tempC, stored.tempF, dynamicDom.currentTemp);
      dynamicDom.tempBtn.forEach((b) => {
        b.classList.toggle('hidden');
      });
    });
  });
}

//!: re factor dynamic function mess, not good to have event listener inside another inside another
// Receives data as obj and display upcoming 7 day weather conditions
export async function renderFutureConditions(stored) {
  dynamicDom.tempBtn.forEach((btn) => {
    for (let i = 0; i < 7; i++) {
      // Displays daily weather condition for upcoming week
      dynamicDom.futureDay[i].textContent = moment().tz(stored.timeZone).day(i + 6).format('dddd, MMMM Do YYYY');
      displayCorrectTempUnit(fahrenheitToCelsius(stored.futureDays[i].temp) , stored.futureDays[i].temp, dynamicDom.futureTemp[i]);
      btn.addEventListener('click', () => {
        displayCorrectTempUnit(fahrenheitToCelsius(stored.futureDays[i].temp) , stored.futureDays[i].temp, dynamicDom.futureTemp[i]);
      });
    } 
  });
}