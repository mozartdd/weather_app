import * as apiModule from './api.js';
import moment from 'moment-timezone';

import clearDay from '../assets/weather-icons/design/fill/final/clear-day.svg';
import cloudy from '../assets/weather-icons/design/fill/final/cloudy.svg';
import rain from '../assets/weather-icons/design/fill/final/extreme-day-rain.svg';
import snow from '../assets/weather-icons/design/fill/final/overcast-day-snow.svg';

import clearNight from '../assets/weather-icons/design/fill/final/starry-night.svg';
import cloudyNight from '../assets/weather-icons/design/fill/final/partly-cloudy-night.svg';
import rainNight from '../assets/weather-icons/design/fill/final/overcast-night-rain.svg';
import snowNight from '../assets/weather-icons/design/fill/final/partly-cloudy-night-snow.svg';

let isCelsius = true;

const weatherIcons = [
  {
    type_21: rain,
    type_31: snow,
    type_41: cloudy,
    type_43: clearDay,
  },
  // Night time icons
  {
    type_21: rainNight,
    type_31: snowNight,
    type_41: cloudyNight,
    type_43: clearNight,
  }
]

// Sets the correct weather icon based on condition type and daytime
// Initially set time to 10 so future days display's daytime forecast
function setWeatherIcon(type, element, time = 10) {
  let isDay = time > 4 && time < 21 ? 0 : 1;

  switch(type) {
    case 'type_21':
      element.src = weatherIcons[isDay].type_21;
      break;
    case 'type_31':
      element.src = weatherIcons[isDay].type_31;
      break;
    case 'type_41':
      element.src = weatherIcons[isDay].type_41;
      break;
    default:
      element.src = weatherIcons[isDay].type_43;
  }
}

export function fahrenheitToCelsius(f) {
  return Math.round((f - 32) * 5 / 9);
}

// Updates temperature display based on unit flag
function displayCorrectTempUnit(c , f, element) {
  element.textContent = isCelsius ? c + '°C' : f + '°F';
}
function displayCorrectWind(c , f, element) {
  element.textContent = isCelsius ? c + ' km/h' : f + ' m/h';
}

// DOM references for current and future weather data
const dynamicDom = {
  currentLocation: document.querySelector('[data-panel-location]'),
  currentTime: document.querySelector('[data-panel-time]'),
  currentTemp: document.querySelector('[data-current-temp]'),
  currentIcon: document.querySelector('[data-weather-symbol]'),
  wind: document.querySelector('[data-wind]'),

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
export function renderCurrentConditions(stored) {
  dynamicDom.currentLocation.textContent = stored.resolvedAddress;
  // Displays current date and time
  dynamicDom.currentTime.textContent = moment()
  .tz(stored.timeZone)
  .format('MMMM Do, h:mm a');
  displayCorrectWind(stored.windSpeedC, stored.windSpeedF, dynamicDom.wind);
  displayCorrectTempUnit(stored.tempC, stored.tempF, dynamicDom.currentTemp);
  setWeatherIcon(stored.conditions, dynamicDom.currentIcon, stored.currentHrs);

    // Update temperature when unit toggle is clicked
  domControls.tempBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      displayCorrectWind(stored.windSpeedC, stored.windSpeedF, dynamicDom.wind);
      displayCorrectTempUnit(stored.tempC, stored.tempF, dynamicDom.currentTemp);
    });
  });
}

// Render 7-day weather forecast in UI
export function renderFutureConditions(stored) {
  const DAYS_IN_WEEK = 7;

  domControls.tempBtn.forEach((btn) => {
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      const dayData = stored.futureDays[i];

      // Use only the first listed condition type
      const weatherType = dayData.conditions.split(',')[0];

      setWeatherIcon(weatherType, dynamicDom.futureSymbol[i]);
      dynamicDom.futureDay[i].textContent = i === 0 ? 'Today' : moment(dayData.datetime).format('dddd');

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