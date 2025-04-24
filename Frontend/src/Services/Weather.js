
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
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
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
        setError('Enter City Name to fetch');
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
      title: "Weather Forecasting",
      description: "Weather forecasting provides accurate predictions of atmospheric conditions, helping people prepare for upcoming weather events. It uses data from satellites, radar, and weather models to ensure timely and reliable forecasts.",
    },
    {
      icon: "🍎",
      title: "Rainfall Measurement",
      description: "Rainfall measurement tracks the amount of rain that falls over a specific period, helping to assess water availability and weather patterns. It uses instruments like rain gauges to collect and analyze precipitation data.",
    },
    {
      icon: "🐄",
      title: "Storm Tracking Tools",
      description: "Storm tracking tools monitor and predict the movement and intensity of storms, such as hurricanes and tornadoes. They use real-time data from satellites, radar, and weather stations to provide accurate warnings and ensure public safety.",
    },
    {
      icon: "🌾",
      title: "Solar Energy Equipment",
      description: "Solar energy equipment includes tools like solar panels, inverters, and batteries that capture, convert, and store sunlight for energy use. It helps reduce reliance on traditional power sources and promotes sustainable energy solutions.",
    },
    {
      icon: "🚜",
      title: "Climate Data & Analysis",
      description: "Climate data and analysis involve the collection and study of long-term weather patterns to understand climate trends. This data helps predict future climate changes and supports decision-making in agriculture, energy, and environmental conservation.",
    },
    {
      icon: "📋",
      title: "Wind Speed Monitoring",
      description: "Wind speed monitoring tracks the velocity of wind using instruments like anemometers. It is essential for weather forecasting, renewable energy generation, and ensuring safety during storms or extreme weather events..",
    },
  ];

  return (
    <>
      <NavBar />
      <div>
        <div className="mc">
          <div className="cs">
            <h2 className="head1">Weather Analysis</h2>
            <p className="head2">PROVIDED BY AgriHaven</p>
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
          <div className='rac'>
              <h2>Rain Alerts</h2>
              </div>
          {rainAlerts.length > 0 && (
            
            <div className="rain-alerts">
              {rainAlerts.map((alert, index) => (
                <div key={index} className="rain-alert">
                  <p>Date : {alert.date}</p>
                  <p>Chance of Rain : {alert.chance}%</p>
                  <p>Condition : {alert.condition}</p>
                  <p>Action : Prepare irrigation systems and protect crops.</p>
                </div>
              ))}
            </div>
          )}

          {/* Seasonal Crops Section */}
          <div className="seasonal-crops">
            <h2>Season : {currentSeason}</h2>
            <h3>Recommended Crops for {currentSeason} :</h3>
            <ul>
              {seasonalCrops.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="services-container">
          <div className="serv">
            <h2 className="services-title">Weather Updates</h2>
            <p className="services-subtitle">
            AgriHaven empowers users to access real-time weather updates and forecasts, ensuring accurate and timely information through a global, community-driven platform.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-weather">
          {/* Top Section */}
          <div className="content-weather">
            <p className="sub-heading-weather">AT AgriHaven</p>
            <h1 className="main-heading-weather">
              For Accurate Weather Insights<br /> <span>Every Day</span>
            </h1>
            <div className='desccc-weather'>
            <p className="description-weather">
            At AgriHaven, we are dedicated to bridging the gap between meteorologists and the public, providing seamless access to accurate and timely weather information.
            </p>
            <p className='description-weather'> Our platform empowers users to stay informed with reliable forecasts, ensuring safety and preparedness in any weather condition.</p>
            <p className="description-weather">
            With a focus on innovation and accuracy, AgriHaven offers real-time data, advanced tracking tools, and weather insights. From rainfall measurements to storm predictions,
            </p>
            <p className="description-weather">
            we aim to deliver comprehensive weather updates that keep you ahead of the forecast.
            </p>
            <p className="description-weather">
            AgriHaven is your trusted partner, helping individuals and communities navigate the weather with confidence while promoting preparedness and resilience.
            </p>
            </div>
          </div>
        </div>

        <div className="image-containerss-weather">
          <img
            src="/Images/rain1.jpg"
            alt="Sustainable Agriculture"
            className="farming-imagess-weather"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Weather;
