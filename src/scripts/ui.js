import { formatWeatherData, getWeatherApi } from "./api";

const domElements = {
  userInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-btn]'),
  panelHeader: document.querySelector('[data-panel-header] p'),
}

// Receives data as promise obj and displays it on screen trough DOM elements
async function displayData(stored) {
  for (const [key, value] of Object.entries(stored)) {
    console.log(`${key}: ${value}`);
  }
  domElements.panelHeader.textContent = stored.location;
}

async function apiChain(input) {
  try {
    const data = await getWeatherApi(input);
    const stored = await formatWeatherData(data);
    const display = await displayData(stored);
    return display;
  } catch(err) {
    if (domElements.userInput.value === '') {
      alert('Location\'s name can\'t be empty string.');
      return err;
    }
    while (err) {
      alert('Please write valid name of geographical location.');
      break;
    } 
  }
}

domElements.searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  apiChain(domElements.userInput.value);
  domElements.userInput.value = '';
})
apiChain('Cleethorpes');