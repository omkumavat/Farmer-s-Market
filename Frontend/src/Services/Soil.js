
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import '../ServicesCSS/Weather.css';
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import axios from 'axios';
import "../ServicesCSS/soil.css";


const mapStyles = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 20.5937, // Default latitude (India)
  lng: 78.9629, // Default longitude (India)
};

const Weather = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLatitude(lat);
    setLongitude(lng);

    // Fetch soil data for the clicked location
    fetchSoilData(lat, lng);
  };






  const fetchSoilData = async (lat, lng) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/soil-data?lat=${lat}&lon=${lng}`);
      setSoilData(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Use message from backend error response
      } else {
        setError('Error fetching soil data');
      }
    } finally {
      setLoading(false);
    }
  };
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
            <h2 className="head1">Get Your Soil Detail</h2>
            <p className="head2">PROVIDED BY VERDICA</p>
          </div>
        </div>
        <div className="map-container">
          <h1>Click on the Map to Get Soil Information</h1>
          <LoadScript googleMapsApiKey="AIzaSyD0w1lvfJkEcNqp-3gJ-9s8GSLr8GrhzoQ">
            <GoogleMap
              mapContainerStyle={mapStyles}
              center={defaultCenter}
              zoom={13}
              onClick={handleMapClick}
            />
          </LoadScript>

          <div className="info-container">
            {latitude && longitude && (
              <>
                <p><strong>Latitude:</strong> {latitude}</p>
                <p><strong>Longitude:</strong> {longitude}</p>
              </>
            )}
            {loading && <p className="loading-message">Loading soil data...</p>}
            {error && <p className="error-message">{error}</p>}
            {soilData && (
              <>
                <h2>Soil Analysis Report</h2>
                <p><strong>Soil pH (0-5cm depth):</strong> {soilData.properties.pH['0-5cm']}</p>
                <p><strong>Organic Carbon Content (0-5cm depth):</strong> {soilData.properties.OC['0-5cm']}</p>
                <p><strong>Clay Content (0-5cm depth):</strong> {soilData.properties.clay['0-5cm']}</p>
                <p><strong>Soil Type:</strong> {soilData.properties.soil_type}</p>
                <p><strong>Recommended Fertilizer:</strong> {soilData.properties.recommended_fertilizer}</p>
              </>
            )}
          </div>
        </div>

<div className="container-weather">
  {/* Top Section */}
  <div className="content-weather">
    <p className="sub-heading-weather">AT VERDICA</p>
    <h1 className="main-heading-weather">
      For Accurate Soil Insights<br /> <span>Every Day</span>
    </h1>
    <div className="desccc-weather">
      <p className="description-weather">
        At VERDICA, we bridge the gap between farmers and modern soil science, offering seamless access to soil analysis and recommendations.
      </p>
      <p className="description-weather">
        Our platform empowers users to optimize crop production by providing real-time soil data and actionable insights.
      </p>
      <p className="description-weather">
        With a focus on innovation and sustainability, VERDICA delivers advanced soil testing, moisture tracking, and nutrient analysis to ensure the best results.
      </p>
      <p className="description-weather">
        We aim to help you understand your soil’s health, promoting effective agricultural practices and long-term soil conservation.
      </p>
      <p className="description-weather">
        VERDICA is your trusted partner, enabling informed decisions for sustainable farming and resilient agricultural systems.
      </p>
    </div>
  </div>
</div>


        <div className="image-containerss-weather">
          <img
            src="/Images/homeimages/soil.jpg"
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
