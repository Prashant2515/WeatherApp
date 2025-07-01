import React, {  useState } from "react";
import "./Weather.css";
import CloudyDay from '../Assets/CloudyDay.png'

function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [cloudImage,setCloudImage] =useState(CloudyDay);
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fea5b3efaf453ae0ace70da1e799c0f2`;
      const response = await fetch(url);
      const data = await response.json();
      setCloudImage(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      setWeatherData({
        max: Math.floor(data.main.temp_max),
        min: Math.floor(data.main.temp_min),
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });

    } catch (error) {
      console.error("Error while fetching data from API");
    }
  };

  const handleClick = () => {
    search(citySearch);
  };
  return (
    <>
      <div className="weather_main">
        <h1>Weather App</h1>
        <div className="head">
          <input
            type="text"
            placeholder="City Name"
            className="Search"
            onChange={(e) => setCitySearch(e.target.value)
            }
          />
          <button className="SearchBtn" onClick={handleClick}>
            Search
          </button>
        </div>
        <div className="icon_img">
          <img src={cloudImage}  alt="icon" />
        </div>
        <div className="Temperature_section">
          <p>City</p>
          <span>{weatherData.location}</span>
        </div>

        <div className="Temperature_section">
          <p>Temperature</p>
          <span>{weatherData.temp}°C</span>
        </div>
        <div className="Temperature_section">
          <p>Max Temperature</p>
          <span>{weatherData.max}°C</span>
        </div>
        <div className="Temperature_section">
          <p>Min Temperature</p>
          <span>{weatherData.min}°C</span>
        </div>
      </div>
    </>
  );
}
export default Weather;
