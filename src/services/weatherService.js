import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch current weather for a city
export const getCurrentWeather = (city, unit = "metric") =>
  axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });

// Function to fetch 5-day weather forecast for a city
export const getFiveDayForecast = (city, unit = "metric") =>
  axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: unit,
      appid: API_KEY,
    },
  });
