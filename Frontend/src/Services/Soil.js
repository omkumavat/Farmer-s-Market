import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../ServicesCSS/soil.css";


const mapStyles = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 20.5937, // Default latitude (India)
  lng: 78.9629, // Default longitude (India)
};

function MapComponent() {
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
  

  return (
    <><NavBar />
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
        <h2>Soil Data</h2>
        <p><strong>Soil pH (0-5cm):</strong> {soilData.properties.pH['0-5cm']}</p>
        <p><strong>Soil Organic Carbon (0-5cm):</strong> {soilData.properties.OC['0-5cm']}</p>
        <p><strong>Soil Clay Content (0-5cm):</strong> {soilData.properties.clay['0-5cm']}</p>
      </>
    )}
  </div>
</div>

    <Footer />
    </>
  );
}

export default MapComponent;
