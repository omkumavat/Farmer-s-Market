
import React, { useState, useEffect } from 'react';
import '../ServicesCSS/Weather.css';
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Mumbai');
  const [rainAlerts, setRainAlerts] = useState([]);
  const [currentSeason, setCurrentSeason] = useState('');
  const [seasonalCrops, setSeasonalCrops] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '1652c40573d542a297f85139241811'; // Replace with your API key
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
        );

        setWeather(response.data);
        setError(null);

        const alerts = response.data.forecast.forecastday
          .filter(day => day.day.daily_chance_of_rain < 50)
          .map(day => ({
            date: day.date,
            chance: day.day.daily_chance_of_rain,
            condition: day.day.condition.text,
          }));

        setRainAlerts(alerts);
      } catch (err) {
        setWeather(null);
        setError('Could not fetch weather data');
        setRainAlerts([]);
      }
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    // Calculate current season
    const getSeason = (date) => {
      const month = date.getMonth() + 1; // Months are 0-indexed
      if (month >= 3 && month <= 5) return 'Spring';
      if (month >= 6 && month <= 8) return 'Summer';
      if (month >= 9 && month <= 11) return 'Autumn';
      return 'Winter';
    };

    const season = getSeason(new Date());
    setCurrentSeason(season);

    // Map season to crops
    const cropSuggestions = {
      Spring: ['Wheat', 'Barley', 'Peas'],
      Summer: ['Corn', 'Tomatoes', 'Cucumber'],
      Autumn: ['Rice', 'Pumpkin', 'Carrots'],
      Winter: ['Potatoes', 'Spinach', 'Broccoli'],
    };

    setSeasonalCrops(cropSuggestions[season]);
  }, []);

  const services = [
    {
      icon: "🧑‍🌾",
      title: "Fertilizers",
      description: "Homes and thoroughly launder them between usage. We give our teams.",
    },
    {
      icon: "🍎",
      title: "Seeds",
      description: "We are closely monitoring national, state and local health developments.",
    },
    {
      icon: "🐄",
      title: "Agricultural Machinery and Tools",
      description: "Follow these tips from the CDC to help prevent the spread of the seasonal.",
    },
    {
      icon: "🌾",
      title: "Post-Harvest Equipment",
      description: "Industra plays a large role in the comfort of your home, but many.",
    },
    {
      icon: "🚜",
      title: "Farm Infrastructure",
      description: "We realize that every family has their own preferences, so we accommodate.",
    },
    {
      icon: "📋",
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

          {/* Rain Alerts Section */}
          {rainAlerts.length > 0 && (
            <div className="rain-alerts">
              <h2>Rain Alerts</h2>
              {rainAlerts.map((alert, index) => (
                <div key={index} className="rain-alert">
                  <p>Date: {alert.date}</p>
                  <p>Chance of Rain: {alert.chance}%</p>
                  <p>Condition: {alert.condition}</p>
                  <p>Action: Prepare irrigation systems and protect crops.</p>
                </div>
              ))}
            </div>
          )}

          {/* Seasonal Crops Section */}
          <div className="seasonal-crops">
            <h2>Season: {currentSeason}</h2>
            <h3>Recommended Crops for {currentSeason}:</h3>
            <ul>
              {seasonalCrops.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </div>
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
              At Verdica, we are dedicated to providing reliable and up-to-date weather information to help you plan your day effectively.
            </p>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/Images/slider1.jpeg"
            alt="Sustainable Agriculture"
            className="farming-image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Weather;
