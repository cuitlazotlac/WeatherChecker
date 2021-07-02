import React, { useState } from "react";
import { NavBar } from "./components/shared/NavBar";

import "./App.scss";

import sun_icon from "../src/ressources/images/weather-icons/001-sun.svg";
import cloud_icon from "../src/ressources/images/weather-icons/002-cloud.svg";
import heavy_rain_icon from "../src/ressources/images/weather-icons/003-heavy-rain.svg";
import wind_icon from "../src/ressources/images/weather-icons/004-wind.svg";
import fog_icon from "../src/ressources/images/weather-icons/005-fog.svg";
import snow_icon from "../src/ressources/images/weather-icons/006-snow.svg";
import thunderstorm_icon from "../src/ressources/images/weather-icons/007-thunderstorm.svg";

const api = {
  key: "73a1d313044c88b7374f061069884b21",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  var img_src = "";
  var img = new Image();
  var img2 = document.createElement("img"); // Use DOM HTMLImageElement

  var imageName = require('../src/ressources/images/weather-icons/001-sun.svg')

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          // var link_1 = "https://openweathermap.org/img/wn/";
          // var link_2 = ".png";
          // var link = link_1.concat(link_2);
          switch (result.weather[0].main) {
            case "Thunderstorm":
              console.log("Mangoes and papayas are $1.79 a pound.");
              img_src.src = sun_icon;
              break;
            case "Drizzle":
              console.log("Mangoes and papayas are $2.79 a pound.");
              img_src = sun_icon;
              break;
            case "Rain":
              console.log("Mangoes and papayas are $3.79 a pound.");
              img_src = sun_icon;
              break;
            case "Snow":
              console.log("Mangoes and papayas are $4.79 a pound.");
              img_src = sun_icon;
              break;
            case "Mist":
              console.log("Mangoes and papayas are $5.79 a pound.");
              img_src.src = sun_icon;
              break;
            case "Smoke":
              console.log("Mangoes and papayas are $6.79 a pound.");
              img_src = sun_icon;
              break;
            case "Haze":
              console.log("Mangoes and papayas are $7.79 a pound.");
              img_src = sun_icon;
              break;
            case "DustMist":
              console.log("Mangoes and papayas are $8.79 a pound.");
              img_src = sun_icon;
              break;
            case "Fog":
              console.log("Mangoes and papayas are $9.79 a pound.");
              img_src = sun_icon;
              break;
            case "Sand":
              console.log("Mangoes and papayas are $10.79 a pound.");
              img_src = sun_icon;
              break;
            case "Dust":
              console.log("Mangoes and papayas are $11.79 a pound.");
              img_src = sun_icon;
              break;
            case "Ash":
              console.log("Mangoes and papayas are $12.79 a pound.");
              img_src = sun_icon;
              break;
            case "Squall":
              console.log("Mangoes and papayas are $13.79 a pound.");
              img_src = sun_icon;
              break;
            case "Tornado":
              console.log("Mangoes and papayas are $14.79 a pound.");
              img_src = sun_icon;
              break;
            case "Clear":
              console.log("Mangoes and papayas are $15.79 a pound.");
              img_src = "../src/ressources/images/weather-icons/001-sun.svg";
              console.log(img_src);
              img.src = "../src/ressources/images/weather-icons/001-sun.svg";
              console.log(img);
              img2.src = "../src/ressources/images/weather-icons/001-sun.svg";
              console.log(img2);
              break;
            case "Clouds":
              console.log("Mangoes and papayas are $16.79 a pound.");
              img_src = "../src/ressources/images/weather-icons/001-sun.svg";
              break;
            default:
              console.log(`Sorry, we are out of ${result.weather[0].main}.`);
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    // here if nothing we put the app - if it's above 16 degres then we put use the class app warm
    // it's here that we have to change the conditions to put continents background
    <>
      <NavBar />
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app-warm"
              : "app-cold"
            : "app-other"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-block">
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="coord-lat">
                  Coord Latitude: {weather.coord.lat}
                </div>
                <div className="coord-lon">
                  Coord Longitude: {weather.coord.lon}
                </div>
              </div>

              <div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="weather">{weather.weather[0].description}</div>
              </div>

              <div>
                <h2>
                  Here goes the image
                  <img src={img2} />
                  {/* <img src={imageName} /> */}
                </h2>
                <div className="weather">{weather.weather[0].icon}</div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                ></img>

                {/* <img src={sun_icon} /> */}
              </div>

              {/* {Math.round(weather.main.temp)}°c */}
              <div className="weather-block">
                <div className="main-temp">{weather.main.temp}°c</div>
                <div className="temp-max">
                  Temp Max: {weather.main.temp_max}°
                </div>
                <div className="temp-min">
                  Temp Min: {weather.main.temp_min}°
                </div>
                <div className="details-title">Details</div>
                <div className="temp-feeling">
                  Feels like: {weather.main.feels_like}°
                </div>
                <div className="humidity">
                  Humidity: {weather.main.humidity}
                </div>
                <div className="wind">Wind: {weather.wind.speed}</div>
              </div>
            </div>
          ) : (
            "Here goes the initial part"
          )}
        </main>
      </div>
    </>
  );
}

export default App;
