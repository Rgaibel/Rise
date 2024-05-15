// Function to fetch weather data for a city
async function getWeatherData(city: string): Promise<any> {
  const apiKey = '06088fcd9861411889e65624241505'; // Replace with your API key from WeatherAPI.com
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to calculate average temperature for each day of the week
function calculateAverageTemperatures(weatherData: any): any {
  const output: number[] = [];
  const averageTemps: { [key: string]: { sum: number; count: number } } = {};
  weatherData.forecast.forecastday.forEach((item: any) => {
    const date = new Date(item.date); // Convert date string to JavaScript date
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (!averageTemps[dayOfWeek]) {
      averageTemps[dayOfWeek] = { sum: 0, count: 0 };
    }
    averageTemps[dayOfWeek].sum += item.day.avgtemp_c;
    averageTemps[dayOfWeek].count++;
  });
  // Calculate average temperature for each day
  for (const dayOfWeek in averageTemps) {
    output[dayOfWeek] = Math.round(
      averageTemps[dayOfWeek].sum / averageTemps[dayOfWeek].count
    );
  }
  return output;
}

// Function to inject the weather div into the specified div or create a new div
function injectWeatherDiv(divId?: string): void {
  const div =
    document.getElementById(divId || 'weatherDiv') ||
    document.createElement('div');
  div.id = divId || 'weatherDiv';
  div.innerHTML = `
        <input type="text" id="cityInput" placeholder="Enter city name">
        <button id="submitButton">Submit</button>
        <div id="weatherDisplay"></div>
    `;
  document.body.appendChild(div);

  const cityInput = document.getElementById('cityInput') as HTMLInputElement;
  const submitButton = document.getElementById(
    'submitButton'
  ) as HTMLButtonElement;
  const weatherDisplay = document.getElementById(
    'weatherDisplay'
  ) as HTMLDivElement;

  submitButton.addEventListener('click', async () => {
    const city = cityInput.value;
    const weatherData = await getWeatherData(city);
    const averageTemps = calculateAverageTemperatures(weatherData);
    weatherDisplay.innerHTML = '';
    for (const dayOfWeek in averageTemps) {
      weatherDisplay.innerHTML += `<p>${dayOfWeek}: ${averageTemps[dayOfWeek]}°C</p>`;
    }
  });
}

// Inject weather div into the specified div or create a new div in the body
injectWeatherDiv();
