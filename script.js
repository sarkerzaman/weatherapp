const form = document.getElementById('weatherForm');
const weatherResult = document.getElementById('weatherResult');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const locationInput = document.getElementById('location').value;
  const location = getLocation(locationInput);
  getWeatherData(location);
});

function getLocation(locationInput) {
    // Check if the input is numeric to determine if it's a ZIP code
    if (!isNaN(locationInput)) {
      return `zip=${locationInput}`;
    } else {
      return `q=${encodeURIComponent(locationInput)}`;
    }
}

async function getWeatherData(location) {
  const apiKey = '67e4e157adba10321ebeefedf7652798';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();
    //console.log(weatherData);

    // Extract relevant weather information
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    const weatherDescription = weatherData.weather[0].description;

    // Display weather information
    weatherResult.innerHTML = `
      <h3>${cityName}</h3>
      <p>Temperature: ${temperature}&degC</p>
      <p>Humidity: ${humidity}%</p>
      <h4>Description:</h4>
      <p>Weather: ${weatherDescription}</p>
      <p>Wind: ${wind}km/h</p>
    `;
    weatherResult.style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
    weatherResult.innerHTML = 'Failed to fetch weather data. Please try again.';
    weatherResult.style.display = 'block';
  }
}
