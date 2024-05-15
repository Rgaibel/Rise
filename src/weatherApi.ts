export async function getWeatherData(
  location: string | { lat: number; lon: number }
): Promise<any> {
  const apiKey = '06088fcd9861411889e65624241505';
  let url: string;
  if (typeof location === 'string') {
    // City name input
    url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=14`;
  } else {
    // Coordinates input
    url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.lat},${location.lon}&days=14`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
