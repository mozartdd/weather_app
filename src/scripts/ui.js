// import moment from 'moment-timezone';
// import { fahrenheitToCelsius } from './scripts';
// let isCelsius = true;

// // If isCelsius is true display temp in celsius else in fahrenheit
// function displayCorrectTempUnit(c , f, element) {
//   element.textContent = isCelsius ? c + '°C' : f + '°F';
// }

// // This object holds dom elements which are containers for storing weather data 
// const dynamicDom = {
//   currentLocation: document.querySelector('[data-panel-location]'),
//   currentTime: document.querySelector('[data-panel-time]'),
//   currentTemp: document.querySelector('[data-current-temp]'),
//   tempBtn: document.querySelectorAll('[data-temp-btn]'),
//   futureTemp: document.querySelectorAll('[data-future-temp]'),
//   futureDay: document.querySelectorAll('[data-week-day]'),
// }

// //Todo: Add bool values for daytime, create && statement which will
// //Todo: look at daytime and weather type and display correct icon

// // Receives data as obj and displays current conditions
// export async function renderCurrentConditions(stored) {
//   dynamicDom.currentLocation.textContent = stored.resolvedAddress;
//   dynamicDom.currentTime.textContent = moment()
//   .tz(stored.timeZone)
//   .format('MMMM Do, h:mm a');
//   displayCorrectTempUnit(
//     stored.tempC, 
//     stored.tempF, 
//     dynamicDom.currentTemp
//   );

//   dynamicDom.tempBtn.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       isCelsius = !isCelsius;
//       displayCorrectTempUnit(
//         stored.tempC, 
//         stored.tempF, 
//         dynamicDom.currentTemp
//       );
//       dynamicDom.tempBtn.forEach((b) => {
//         b.classList.toggle('hidden');
//       });
//     });
//   });
// }

// // Receives data as obj and display upcoming 7 day weather conditions
// export async function renderFutureConditions(stored) {
//   const DAYS_IN_WEEK = 7;
//   dynamicDom.tempBtn.forEach((btn) => {
//     for (let i = 0; i < 7; i++) {
//       // Displays day and date for upcoming week
//       dynamicDom.futureDay[i].textContent = moment(stored.futureDays[i + 1].datetime)
//         .format('dddd, MMMM Do');
//       // Calls function over each of next seven days in future days array of objects
//       displayCorrectTempUnit(
//         fahrenheitToCelsius(
//           stored.futureDays[i].temp), 
//           stored.futureDays[i].temp, 
//           dynamicDom.futureTemp[i]
//         );
//       // Updates each day's temp unit after temp convertor button is being clicked
//       btn.addEventListener('click', () => {
//         displayCorrectTempUnit(
//           fahrenheitToCelsius(stored.futureDays[i].temp), 
//           stored.futureDays[i].temp, 
//           dynamicDom.futureTemp[i]);
//       });
//     } 
//   });
// }