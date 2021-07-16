import React, { useState } from "react";
import { NavBar } from "./components/shared/NavBar";

import "./App.scss";

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
  var imageName = require("../src/ressources/images/weather-icons/001-sun.svg");

  function calcTime(city, offset) {
    var d = new Date();

    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    var nd = new Date(utc + 3600000 * offset);

    return "The local time in " + city + " is " + nd.toLocaleString();
  }

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
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
              ? "app warm"
              : "app"
            : "app"
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
                {/* <h2>
                  Here goes the image
                  <img src={img2} />
                  <img src={imageName} />
                </h2> */}
                <img
                  className="weather-icon"
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
            <div>Here goes the initial part</div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
