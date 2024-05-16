import { getWeatherData } from './weatherApi';
import './styles.css';

export function calculateAverageTemperatures(weatherData: any): any {
  const averageTemps: { [key: string]: { sum: number; count: number } } = {};
  weatherData.forecast.forecastday.forEach((item: any) => {
    const date = new Date(item.date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (!averageTemps[dayOfWeek]) {
      averageTemps[dayOfWeek] = { sum: 0, count: 0 };
    }
    averageTemps[dayOfWeek].sum += item.day.avgtemp_c;
    averageTemps[dayOfWeek].count++;
  });

  const output: { [key: string]: number } = {};
  // Calculate average temperature for each day
  for (const dayOfWeek in averageTemps) {
    output[dayOfWeek] = Math.round(
      averageTemps[dayOfWeek].sum / averageTemps[dayOfWeek].count
    );
  }
  return output;
}

export function injectWeatherDiv(divId?: string): void {
  let div = divId ? document.getElementById(divId) : null;
  if (!div) {
    div = document.createElement('div');
    div.id = 'weatherDiv';
    document.body.appendChild(div);
  }

  div.innerHTML = `
        <div id="inputContainer">
          <input type="text" id="cityInput" placeholder="Enter city name or coordinates">
          <button id="submitButton">Submit</button>
        </div>
        <div id="weatherDisplay" class="weather-display"></div>
    `;

  const cityInput = div.querySelector('#cityInput') as HTMLInputElement;
  const submitButton = div.querySelector('#submitButton') as HTMLButtonElement;
  const weatherDisplay = div.querySelector('#weatherDisplay') as HTMLDivElement;

  submitButton.addEventListener('click', async () => {
    const input = cityInput.value;
    let weatherData = null;
    if (input.includes(',')) {
      // Coordinates input
      const [lat, lon] = input
        .split(',')
        .map((coord) => parseFloat(coord.trim()));
      weatherData = await getWeatherData({ lat, lon });
    } else {
      // City name input
      weatherData = await getWeatherData(input);
    }

    weatherDisplay.innerHTML = '';
    if (weatherData) {
      weatherDisplay.classList.add('selected');
      const averageTemps = calculateAverageTemperatures(weatherData);
      for (const dayOfWeek in averageTemps) {
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('day-container');
        dayContainer.innerHTML = `
          <div class="day-name">${dayOfWeek.slice(0, 3)}</div>
          <div class="weather-icon">
              <img src="dist/assets/sun.png" alt="sun icon">
          </div>
          <div class="temperature">${averageTemps[dayOfWeek]}°C</div>
        `;
        weatherDisplay.appendChild(dayContainer);
      }
    } else {
      weatherDisplay.classList.remove('selected');
    }
  });
}
