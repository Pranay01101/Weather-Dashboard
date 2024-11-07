# Weather Dashboard

This is a React-based weather dashboard application that allows users to search for weather information in any city, view a 5-day forecast, and save favorite cities for quick access.

## Features

- Search for current weather and a 5-day forecast for any city.
- Save cities to favorites for easy access.
- Toggle temperature units between Celsius and Fahrenheit.

## Obtaining an OpenWeatherMap API Key

To run this project, you will need to add the following environment variables to your .env file

- Visit OpenWeatherMap and create an account if you don't already have one.
- Once registered, navigate to the API keys section in your - OpenWeatherMap account dashboard.
- Copy your API key.

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/Pranay01101/Weather-Dashboard.git
```

2. Navigate into the project directory:

```bash
 cd weather-dashboard
```

3. Install dependencies:

```bash
 npm install
```

4. Create a .env file in the root directory of the project and add your API key as follows:

```bash
 REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

## Setting Up a Local JSON Server (for Favorites Cities)

To save favorite cities, this application uses a JSON server. Follow these steps to set up the server:

1. Install JSON Server:

```bash
 npm install -g json-server
```

2. Create a db.json file in the root of your project with the following content:

```json
{
  "favorites": []
}
```

3. Run the JSON server on port 3001:

```bash
json-server --watch db.json --port 3001
```

This will create an API endpoint for managing favorite cities at http://localhost:3001/favorites.

## Running the Application

1. Start the application:

```bash
 npm start
```

2. Open your browser and go to http://localhost:3000 to view the application.

## Available Scripts

- npm start: Runs the app in development mode.
- npm run build: Builds the app for production.
