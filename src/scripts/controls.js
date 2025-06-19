import { formatWeatherData, getWeatherApi } from "./api";
import { displayData } from "./ui";

const domControls = {
  userInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-btn]'),
}

async function apiChain(input) {
  try {
    const data = await getWeatherApi(input);
    const stored = await formatWeatherData(data);
    const display = await displayData(stored);
    return display;
  } catch(err) {
    if (domControls.userInput.value === '') {
      alert('Location\'s name can\'t be empty string.');
      return err;
    }
    while (err) {
      alert('Please write valid name of geographical location.');
      break;
    } 
  }
}

// Todo: add function to change isCelsius status with dropdown menu div

domControls.searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  apiChain(domControls.userInput.value);
  domControls.userInput.value = '';
})
apiChain('London');