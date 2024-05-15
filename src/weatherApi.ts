// weatherApi.ts
export async function getWeatherData(city: string): Promise<any> {
  const apiKey = '06088fcd9861411889e65624241505'; // Replace with your API key from WeatherAPI.com
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
