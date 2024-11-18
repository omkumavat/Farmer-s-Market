import React, { useState, useEffect } from 'react';
import '../ServicesCSS/Weather.css';
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import axios from 'axios';

const Weather = () => {
  // Weather state and logic
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

  const services = [
    {
      icon: "🧑‍🌾", // Replace with your SVG or image
      title: "Fertilizers",
      description: "Homes and thoroughly launder them between usage. We give our teams.",
    },
    {
      icon: "🍎", // Replace with your SVG or image
      title: "Seeds",
      description: "We are closely monitoring national, state and local health developments.",
    },
    {
      icon: "🐄", // Replace with your SVG or image
      title: "Agricultural Machinery and Tools",
      description: "Follow these tips from the CDC to help prevent the spread of the seasonal.",
    },
    {
      icon: "🌾", // Replace with your SVG or image
      title: "Post-Harvest Equipment",
      description: "Industra plays a large role in the comfort of your home, but many.",
    },
    {
      icon: "🚜", // Replace with your SVG or image
      title: "Farm Infrastructure",
      description: "We realize that every family has their own preferences, so we accommodate.",
    },
    {
      icon: "📋", // Replace with your SVG or image
      title: "Irrigation Equipment",
      description: "While some cleaning companies use rotating cleaning plans, we’re equipped.",
    },
  ];

  return (
    <>
      <NavBar />
      <div>
        <div className="mc">
          <div className="cs">
            <h2 className="head1">Weather Services</h2>
            <p className="head2">PROVIDED BY VERDICA</p>
          </div>
        </div>

        {/* Image Section */}

        {/* Weather Section */}
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

        <div className="services-container">
          <div className="serv">
            <h2 className="services-title">Agricultural Products</h2>
            <p className="services-subtitle">
              Industra is a global community of practice that facilitates dialogue,
              information exchange, and the use of information.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <a href="#" className="service-link">
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          {/* Top Section */}
          <div className="content">
            <p className="sub-heading">AT VERDICA</p>
            <h1 className="main-heading">
  For Accurate Weather Insights<br /> <span>Every Day</span>
</h1>
<p className="description">
  At Verdica, we are dedicated to providing reliable and up-to-date weather information to help you plan your day effectively. Whether you're at home or on the go, access real-time weather updates tailored to your location.
</p>
<p className="description">
  With a focus on precision and user-friendly design, Verdica offers detailed forecasts, current conditions, and alerts for changing weather patterns. From temperature and humidity to wind speed and precipitation, we bring you all the data you need.
</p>
<p className="description">
  Verdica is your trusted weather companion, helping you stay informed and prepared no matter the season. Experience seamless access to weather details and take control of your plans with confidence.
</p>

          </div>
        </div>

        <div className="image-container">
          <img
            src="/Images/slider1.jpeg" // Placeholder image URL
            alt="Sustainable Agriculture"
            className="farming-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Weather;
