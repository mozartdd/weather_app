import { formatWeatherData, getWeatherApi } from "./api";

const userInput = document.querySelector('input');
const btn = document.querySelector('button');

// Receives data as promise obj and displays it on screen trough DOM elements
async function displayData(stored) {
  console.log(stored.location);
}

async function apiChain(input) {
  try {
    const data = await getWeatherApi(input);
    const stored = await formatWeatherData(data);
    const display = await displayData(stored);
    return display;
  } catch(err) {
    if (userInput.value === '') {
      alert('Location\'s name can\'t be empty string.');
      return err;
    }
    while (err) {
      userInput.value = '';
      alert('Please write valid name of geographical location.');
      break;
    } 
  }
}

btn.addEventListener('click', (event) => {
  event.preventDefault();
  apiChain(userInput.value);
})
apiChain('London');