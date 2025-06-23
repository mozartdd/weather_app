import * as apiModule from './api.js';
import moment from 'moment-timezone';

import clearDay from '../assets/weather-icons/design/fill/final/clear-day.svg';
import cloudy from '../assets/weather-icons/design/fill/final/cloudy.svg';
import rain from '../assets/weather-icons/design/fill/final/extreme-day-rain.svg';
import snow from '../assets/weather-icons/design/fill/final/overcast-day-snow.svg';

let isCelsius = true;
// TODO: Add daytime condition to select correct icon variant (day/night)

// Weather icon mapping based on condition types
const dayObj = {
  type_21: rain,
  type_31: snow,
  type_41: cloudy,
  type_43: clearDay,
}

// Sets the correct weather icon based on condition type
function setWeatherIcon(type, element) {
  switch(type) {
    case 'type_21':
      element.src = dayObj.type_21;
      break;
    case 'type_31':
      element.src = dayObj.type_31;
      break;
    case 'type_41':
      element.src = dayObj.type_41;
      break;
    default:
      element.src = dayObj.type_43;
  }
}

export function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * 5 / 9);
}

// Updates temperature display based on unit flag
function displayCorrectTempUnit(c , f, element) {
  element.textContent = isCelsius ? c + '°C' : f + '°F';
}

// DOM references for current and future weather data
const dynamicDom = {
  currentLocation: document.querySelector('[data-panel-location]'),
  currentTime: document.querySelector('[data-panel-time]'),
  currentTemp: document.querySelector('[data-current-temp]'),
  currentIcon: document.querySelector('[data-weather-symbol]'),

  futureTemp: document.querySelectorAll('[data-future-temp]'),
  futureDay: document.querySelectorAll('[data-week-day]'),
  futureSymbol: document.querySelectorAll('[data-future-symbol]')
}

// DOM controls for UI interactions
const domControls = {
  tempBtn: document.querySelectorAll('[data-temp-btn]'),
  userInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-btn]'),
}

// Toggle temperature unit and update UI buttons
domControls.tempBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    isCelsius = !isCelsius;
    domControls.tempBtn.forEach((b) => {
      b.classList.toggle('hidden');
    });
  });
});

// Render current weather data in UI
export async function renderCurrentConditions(stored) {
  dynamicDom.currentLocation.textContent = stored.resolvedAddress;
  // Displays current date and time
  dynamicDom.currentTime.textContent = moment()
  .tz(stored.timeZone)
  .format('MMMM Do, h:mm a');
  displayCorrectTempUnit(stored.tempC, stored.tempF, dynamicDom.currentTemp);
  setWeatherIcon(stored.conditions, dynamicDom.currentIcon);

    // Update temperature when unit toggle is clicked
  domControls.tempBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      displayCorrectTempUnit(stored.tempC, stored.tempF, dynamicDom.currentTemp);
    });
  });
}

// Render 7-day weather forecast in UI
export async function renderFutureConditions(stored) {
  const DAYS_IN_WEEK = 7;

  domControls.tempBtn.forEach((btn) => {
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      const dayData = stored.futureDays[i];

      // Use only the first listed condition type
      const weatherType = dayData.conditions.split(',')[0];

      setWeatherIcon(weatherType, dynamicDom.futureSymbol[i]);
      dynamicDom.futureDay[i].textContent = i === 0 ? 'Tomorrow' : moment(dayData.datetime).format('dddd');

      displayCorrectTempUnit(
        fahrenheitToCelsius(dayData.temp),
        dayData.temp,
        dynamicDom.futureTemp[i]
      );

      // Update each day's forecast on unit toggle
      btn.addEventListener('click', () => {
        setWeatherIcon(weatherType, dynamicDom.futureSymbol[i]);
        displayCorrectTempUnit(
          fahrenheitToCelsius(dayData.temp),
          dayData.temp,
          dynamicDom.futureTemp[i]
        );
      });
    }
  });
}

// Fetch weather data based on user input
domControls.searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  apiModule.apiChain(domControls.userInput.value);
  domControls.userInput.value = '';
});