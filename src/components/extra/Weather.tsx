import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const city = 'Dhaka'; // Set the city to 'Dhaka' permanently
  const apiKey = 'd32a35edf73edc2da892f1a3c0759497';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          setWeatherData(null);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
      <Heading as="h1" size="lg" mb={4}>
        Weather App
      </Heading>
      {weatherData && weatherData.main && (
        <Box>
          <Heading as="h2" size="md">
            Weather in {city}
          </Heading>
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <Text>Conditions: {weatherData.weather[0].description}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
