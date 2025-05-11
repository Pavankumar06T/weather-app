async function getForecast() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "154f0ccd69271e2445b48f1ad84a05cb";
  const forecastContainer = document.getElementById("forecastContainer");
  const highlights = document.getElementById("todayHighlights");

  if (!city) {
    forecastContainer.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found.");
    const data = await res.json();

    const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
    const today = data.list[0]; // First item is closest to current

    forecastContainer.innerHTML = "";

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt_txt).toDateString();
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

      const html = `
        <div class="forecast-box">
          <h3>${date}</h3>
          <img src="${icon}" alt="${day.weather[0].description}">
          <p><strong>${day.weather[0].main}</strong></p>
          <p>${day.main.temp}°C</p>
        </div>
      `;
      forecastContainer.innerHTML += html;
    });

    // Today's Highlights
    document.getElementById("feelsLike").innerHTML = `🌡️ Feels like: ${today.main.feels_like}°C`;
    document.getElementById("humidity").innerHTML = `💧 Humidity: ${today.main.humidity}%`;
    document.getElementById("pressure").innerHTML = `🧭 Pressure: ${today.main.pressure} hPa`;
    document.getElementById("wind").innerHTML = `💨 Wind: ${today.wind.speed} m/s`;

  } catch (err) {
    forecastContainer.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}