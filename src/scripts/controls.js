import { formatWeatherData, getWeatherApi } from "./scripts.js";
import { renderFutureConditions, renderCurrentConditions } from "./ui.js";

const domControls = {
  userInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-btn]'),
}

async function apiChain(input) {
  try {
    const data = await getWeatherApi(input);
    const stored = await formatWeatherData(data);
    renderCurrentConditions(stored);
    renderFutureConditions(stored);
  } catch(err) {
    alert('Please write valid name of geographical location.');
    console.error(err);
  }
}

// On click makes request for weather api based user input value
domControls.searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  apiChain(domControls.userInput.value);
  domControls.userInput.value = '';
})
apiChain('London');