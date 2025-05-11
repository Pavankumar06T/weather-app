const apiKey = "154f0ccd69271e2445b48f1ad84a05cb";
const forecastContainer = document.getElementById("forecast");
const todayContainer = document.getElementById("today");
const getForecastBtn = document.getElementById("getForecast");

getForecastBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  if (city) {
    getWeatherData(city);
  }
});

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
  const feelsLike = weather.main.feels_like.toFixed(2);
  const humidity = weather.main.humidity;
  const pressure = weather.main.pressure;
  const wind = weather.wind.speed;

  todayContainer.innerHTML = `
    <h2>Today's Highlights</h2>
    <p>🌡️ Feels like: ${feelsLike}°C</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🧭 Pressure: ${pressure} hPa</p>
    <p>💨 Wind: ${wind} m/s</p>
  `;
}

function showForecast(forecasts) {
  forecastContainer.innerHTML = `
    <h2>5-Day Forecast</h2>
    <div class="forecast-cards">
      ${forecasts
        .map((day) => {
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
        })
        .join("")}
    </div>
  `;
}
