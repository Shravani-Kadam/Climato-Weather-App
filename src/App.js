import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "e2c3e419b3b74dcd8b361146252803";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      {/* Single Video Background */}
      <video autoPlay loop muted className="background-video">
        <source src="/cloudy.mp4" type="video/mp4" />
      </video>

      <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <h2 className="heading">🌤️ Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />
      <button onClick={fetchWeather} className="button">
        Get Weather
      </button>

      {loading && <p className="loading">⏳ Fetching data...</p>}
      {error && <p className="error">❌ {error}</p>}

      {weather && (
        <div className="weather-container">
          <h3>
            {weather.location.name}, {weather.location.country}
          </h3>
          <p>🌡️ Temperature: {weather.current.temp_c}°C</p>
          <p>🌥️ Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default App;
