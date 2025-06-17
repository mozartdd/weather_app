import { storeWeatherData } from "./api";

const userInput = document.querySelector('input');
const btn = document.querySelector('button');

async function displayData() {
  try {
    const display = await storeWeatherData(userInput.value);
    console.log(display);
  } catch {
    console.log(await storeWeatherData('Moscow'));
  }
}

btn.addEventListener('click', (event) => {
  event.preventDefault();
  displayData();
})