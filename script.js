async function fetchWeather() {
  let searchInput = document.getElementById("search").value.trim();
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "block";

  if (searchInput === "") {
    weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input!</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
    `;
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(searchInput)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      weatherDataSection.innerHTML = `
        <div>
          <h2>Error</h2>
          <p>${errorData.error || "Unable to fetch weather data."}</p>
        </div>
      `;
      return;
    }

    const data = await response.json();

    weatherDataSection.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
      <div>
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
      </div>
    `;

    document.getElementById("search").value = "";
  } catch (err) {
    console.error(err);
    weatherDataSection.innerHTML = `
      <div>
        <h2>Server Error</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    `;
  }
}
