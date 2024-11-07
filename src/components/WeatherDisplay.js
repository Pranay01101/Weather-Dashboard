import React from "react";

// Function to convert Celsius to Fahrenheit
const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Function to group the forecast data by date
const groupByDate = (forecastList) => {
  return forecastList.reduce((groups, forecast) => {
    const date = forecast.dt_txt.split(" ")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(forecast);
    return groups;
  }, {});
};

const WeatherDisplay = ({
  weatherData,
  forecastData,
  unit,
  onAddToFavorites,
}) => {
  if (!weatherData)
    return <p>Please search for a city to display weather data.</p>;

  const currentTemp =
    unit === "metric"
      ? weatherData.main.temp
      : convertToFahrenheit(weatherData.main.temp);

  const groupedForecast = groupByDate(forecastData?.list || []);

  return (
    <div className="weatherDisplay">
      <h2>
        <i className="fas fa-cloud-sun"></i> Current Weather in{" "}
        {weatherData.name}
      </h2>
      <p className="temp">
        <i className="fas fa-thermometer-half"></i> Temperature: {currentTemp}°
        {unit === "metric" ? "C" : "F"}
      </p>
      <p>
        <i className="fas fa-cloud"></i> Weather:{" "}
        {weatherData.weather[0].description}
      </p>
      <button className="addToFavorites" onClick={onAddToFavorites}>
        <i className="fas fa-heart"></i> Add to Favorites
      </button>

      {groupedForecast && Object.keys(groupedForecast).length > 0 && (
        <div className="forecast">
          <h3>
            <i className="fas fa-calendar-day"></i> 5-Day Forecast
          </h3>
          <ul>
            {Object.keys(groupedForecast)
              .slice(0, 5)
              .map((date, index) => {
                const dayForecast = groupedForecast[date];
                const dailyTemps =
                  unit === "metric"
                    ? dayForecast.map((forecast) => forecast.main.temp)
                    : dayForecast.map((forecast) =>
                        convertToFahrenheit(forecast.main.temp)
                      );
                const avgTemp =
                  dailyTemps.reduce((acc, temp) => acc + temp, 0) /
                  dailyTemps.length;

                return (
                  <li key={index}>
                    <p>
                      <i className="fas fa-calendar"></i> {formatDate(date)}
                    </p>
                    <p>
                      <i className="fas fa-thermometer-three-quarters"></i> Avg
                      Temp: {avgTemp.toFixed(2)}°{unit === "metric" ? "C" : "F"}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      )}

      {!forecastData?.list?.length && <p>No forecast data available.</p>}
    </div>
  );
};

export default WeatherDisplay;
