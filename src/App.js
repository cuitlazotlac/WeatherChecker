import React, { useState } from "react";
import { NavBar } from "./components/shared/NavBar";
import moment from "moment";
import "moment-timezone";

import logo from "../src/ressources/images/logo.svg";
import github from "../src/ressources/images/github.png";

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
    var date = "The local time in " + city + " is " + nd.toLocaleString();
    console.log(date);
  }

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          // const sunrise = new Date((result.dt + result.timezone) * 1000);
          // console.log(sunrise);
          // console.log("below the second test");
          // const test = new Date((result.dt) * 1000);
          // console.log(test);
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
    const hour = d.getHours();

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
            : "intro"
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
            <div className="welcome_message">
              <img className="icon" src={logo} />
              <h1>Welcome to the Weather Checker WebApp</h1>
              <h2>Look for the weather in the favorite city !</h2>
              <img className="icon" src={github} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
