import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ServicesCSS/Weather.css';
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Mumbai');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '1652c40573d542a297f85139241811'; // Replace with your API key
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        setWeather(response.data); // Update weather data
        setError(null); // Clear previous errors
      } catch (err) {
        setWeather(null); // Clear previous weather data
        setError('Could not fetch weather data'); // Set error message
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <><NavBar />
    <div className="weather-container">
      <h2>Weather Information</h2>
      <div>
        <label htmlFor="city">Enter city: </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      {weather ? (
        <div className="weather-card">
          <h3>{weather.location.name}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Weather: {weather.current.condition.text}</p>
          <p>Wind Speed: {weather.current.wind_kph} km/h</p>
        </div>
      ) : !error && <p className="loading-message">Loading weather data...</p>}
    </div>
    <Footer />
    </>
  );
};

export default Weather;
