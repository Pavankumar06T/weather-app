const apiKey = "154f0ccd69271e2445b48f1ad84a05cb";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeatherData(city);
  }
}

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== "200") {
      alert("City not found!");
      return;
    }

    // Today's weather (first entry)
    const today = data.list[0];
    showTodayWeather(today);

    // Get forecasts every 24 hours (skip every 8 entries)
    const forecasts = [];
    for (let i = 0; i < data.list.length; i += 8) {
      forecasts.push(data.list[i]);
    }

    showForecast(forecasts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showTodayWeather(weather) {
  document.getElementById("feels_like").innerText = `🌡️ Feels like: ${weather.main.feels_like.toFixed(2)}°C`;
  document.getElementById("humidity").innerText = `💧 Humidity: ${weather.main.humidity}%`;
  document.getElementById("pressure").innerText = `🧭 Pressure: ${weather.main.pressure} hPa`;
  document.getElementById("wind").innerText = `💨 Wind: ${weather.wind.speed} m/s`;
}

function showForecast(forecasts) {
  const forecastContainer = document.getElementById("forecastCards");
  forecastContainer.innerHTML = forecasts.map((day) => {
    const date = new Date(day.dt * 1000).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const temp = day.main.temp.toFixed(1);
    const icon = day.weather[0].icon;
    return `
      <div class="card">
        <h3>${date}</h3>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
        <p>${temp}°C</p>
      </div>
    `;
  }).join("");
}
