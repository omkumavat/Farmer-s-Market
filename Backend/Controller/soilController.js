import axios from 'axios';

export const getSoilData = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  try {
    const soilResponse = await axios.get(`https://soilgrids.org/api/v1/query?lat=${lat}&lon=${lon}`);
    res.json(soilResponse.data);
  } catch (error) {
    console.error('Error fetching soil data:', error.message);
    res.status(500).json({ message: 'Error fetching soil data' });
  }
};
