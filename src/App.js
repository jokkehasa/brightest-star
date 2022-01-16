import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Location />
      </header>
    </div>
  );
}

function Location() {
  const [location, setLocation] = useState(null);

  if (!location) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    } else {
      console.log("Geolocation not supported")
    }
  }

  return (
    <div>
      {location &&
        <p>Latitude: {location.coords.latitude}<br />Longitude: {location.coords.longitude}</p>
      }
    </div>
  );
}

export default App;
