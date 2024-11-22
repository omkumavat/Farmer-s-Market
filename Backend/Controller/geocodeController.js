import axios from 'axios';
const GEOCODING_API_KEY = process.env.GOOGLE_API_KEY;

export const getCoordinates = async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ message: 'Location is required' });
  }

  try {
    const geoResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyD0w1lvfJkEcNqp-3gJ-9s8GSLr8GrhzoQ`
    );

    const results = geoResponse.data.results;
    if (results.length === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const { lat, lng } = results[0].geometry.location;
    res.json({ lat, lon: lng });
  } catch (error) {
    console.error('Error fetching geocode data:', error.message);
    res.status(500).json({ message: 'Error fetching geocode data' });
  }
};
