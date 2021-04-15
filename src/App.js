import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import {NavBar} from './components/shared/NavBar'

const api = {
  key: "73a1d313044c88b7374f061069884b21",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  
  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

return (
  // here if nothing we put the app - if it's above 16 degres then we put use the class app warm
  // it's here that we have to change the conditions to put continents background
  <>
  <NavBar />
  <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app-warm' : 'app-cold') : 'app-other'}>
    <main>
      <div className="search-box">
        <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {/* {Math.round(weather.main.temp)}°c */}
            {weather.main.temp}°c
          </div>
          <p>DETAILS</p>
          <div>Temp Max:{' '}{weather.main.temp_max}°</div>
          <div>Temp Min:{' '}{weather.main.temp_min}°</div>
          <div>Feels like:{' '}{weather.main.feels_like}°</div>
          <div>Humidity:{' '}{weather.main.humidity}</div>
          <div>Wind:{' '}{weather.wind.speed}</div>
          <div>Visibilty:{' '}{weather.visibility}</div>
          <div>Coord Latitude:{' '}{weather.coord.lat}</div>
          <div>Coord Longitude:{' '}{weather.coord.lon}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
      </div>
      ) : ('')}
    </main>
  </div>
  </>
);
}

export default App;
