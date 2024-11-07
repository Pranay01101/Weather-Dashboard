import React, { useState, useEffect } from "react";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./Favorites";
import {
  getCurrentWeather,
  getFiveDayForecast,
} from "../services/weatherService";
import axios from "axios";
import "../styles/WeatherDashboardStyle.css";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    axios
      .get("http://localhost:3001/favorites")
      .then((response) => setFavorites(response.data))
      .catch((error) => console.error("Error fetching favorites:", error));
  }, []);

  const fetchWeather = (city) => {
    getCurrentWeather(city, unit).then((response) =>
      setWeatherData(response.data)
    );
    getFiveDayForecast(city, unit).then((response) =>
      setForecastData(response.data)
    );
  };

  const addToFavorites = (cityName) => {
    if (!favorites.some((fav) => fav.name === cityName)) {
      axios
        .post("http://localhost:3001/favorites", { name: cityName })
        .then((response) => setFavorites([...favorites, response.data]))
        .catch((error) => console.error("Error adding favorite:", error));
    } else {
      alert(`${cityName} is already in favorites.`);
    }
  };

  const removeFromFavorites = (id) => {
    axios
      .delete(`http://localhost:3001/favorites/${id}`)
      .then(() => setFavorites(favorites.filter((fav) => fav.id !== id)))
      .catch((error) => console.error("Error removing favorite:", error));
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="weatherDashboard">
      <h1>
        <i className="fas fa-cloud-sun"></i> Weather Dashboard
      </h1>
      <Search onSearch={fetchWeather} />
      <div className="unitToggle">
        <button onClick={toggleUnit}>
          <i className="fas fa-sync-alt"></i> Toggle to{" "}
          {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
      <div className="mainContent">
        <WeatherDisplay
          weatherData={weatherData}
          forecastData={forecastData}
          unit={unit}
          onAddToFavorites={() => addToFavorites(weatherData?.name)}
        />
        <Favorites
          favorites={favorites}
          onCitySelect={fetchWeather}
          onRemoveFavorite={removeFromFavorites}
        />
      </div>
    </div>
  );
};

export default WeatherDashboard;
