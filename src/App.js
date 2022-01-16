import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [location, setLocation] = useState(null);
  const [time, setTime] = useState(null);
  const [direction, setDirection] = useState(["N", "S", "E", "W", "NW", "SW", "SE", "NE", "Z"]);

  const updateCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    } else {
      console.log("Geolocation not supported")
    }
    setTime(new Date());
  };

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
      </header>
      <div>
        <table>
          <tr><td>Latitude:</td>
              <td>{location && location.coords.latitude}</td></tr>
          <tr><td>Longitude:</td>
              <td>{location && location.coords.longitude}</td></tr>
          <tr><td>Time:</td>
              <td>{time && time.toString()}</td></tr>
        </table>
      </div>
      <button type="button" onClick={updateCoordinates}>
        Update location and time
      </button>
      <div>
        <p>Viewing direction: {direction.toString()}</p>
      </div>
    </div>
  );
}

export default App;
