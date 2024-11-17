import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ServicesCSS/Weather.css';

const WeatherUpdates = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.87&current_weather=true`
                );
                setWeather(response.data.current_weather);
            } catch (err) {
                setError('Could not fetch weather data');
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className="weather-updates">
            <h2>Weather Updates</h2>
            {error && <p className="error">{error}</p>}
            {weather ? (
                <div>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Windspeed: {weather.windspeed} km/h</p>
                    <p>Weather: {weather.weathercode}</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherUpdates;
