import React, { useState } from 'react';
import './App.css';

const api = {
  key:'437224fc296b985791bb0c1aeb934a51',
  base:'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [first, changeFirst] = useState(true);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
        changeFirst(false);
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
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app cold') : 'app'}>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,500" rel="stylesheet"></link>
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
        <div className='entire'>
          <div className="location-box">

          <div className="weather-box">
            <div className="temp">
              {(Math.round((weather.main.temp) * 9/5 + 32))}°F
            </div>

            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
            
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
        {(typeof weather.main == 'undefined') && first != true ? (
<div className='error'>
  <p className='error-msg'>City not found, try again!</p>
</div>
) : ('')}
      </main>
    </div>
  );
}

export default App;