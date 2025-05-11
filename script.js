body {
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #1f3c88, #4facfe);
  color: white;
}

.container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
  text-align: center;
}

input[type="text"] {
  padding: 10px;
  width: 60%;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #00c896;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
}

.forecast-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  padding: 10px;
}

/* Today's Highlights */
.highlights {
  background-color: #2d3e50;
  padding: 20px;
  border-radius: 10px;
  color: white;
  flex: 1;
}

/* 5-Day Forecast */
.forecast {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 2;
}

.forecast-day {
  background-color: #3b4a5a;
  padding: 15px;
  border-radius: 10px;
  text-align: left;
}

/* Responsive layout for larger screens */
@media (min-width: 768px) {
  .forecast-container {
    flex-direction: row;
  }

  .highlights {
    order: 2;
  }

  .forecast {
    order: 1;
    flex-direction: column;
  }
}

@media (min-width: 992px) {
  .forecast {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  .forecast-day {
    flex: 1 1 calc(50% - 20px);
    min-width: 180px;
  }
}
