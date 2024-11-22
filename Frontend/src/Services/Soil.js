import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch coordinates for the entered location
  const fetchCoordinates = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/geocode?location=${location}`);
      const { lat, lon } = response.data;
      setLatitude(lat);
      setLongitude(lon);
      fetchSoilData(lat, lon);
    } catch (err) {
      setError('Error fetching location data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch soil data based on coordinates
  const fetchSoilData = async (lat, lon) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/soil-data?lat=${lat}&lon=${lon}`);
      setSoilData(response.data);
    } catch (err) {
      setError('Error fetching soil data');
    }
  };

  return (
    <div className="App">
      <h1>Find Soil Data</h1>
      <div>
        <label>Enter Location (City, District, or State):</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Pune, Maharashtra"
        />
        <button onClick={fetchCoordinates}>Get Soil Data</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {soilData && (
        <div>
          <h2>Soil Data for {location}</h2>
          <p><strong>Soil pH (0-5cm):</strong> {soilData.properties.pH['0-5cm']}</p>
          <p><strong>Soil Organic Carbon (0-5cm):</strong> {soilData.properties.OC['0-5cm']}</p>
          <p><strong>Soil Clay Content (0-5cm):</strong> {soilData.properties.clay['0-5cm']}</p>
        </div>
      )}
    </div>
  );
}

export default App;