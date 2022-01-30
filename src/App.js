import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import SkyDirections from './components/SkyDirections';

function App() {
  const [location, setLocation] = useState(null);
  const [time, setTime] = useState(null);
  const [direction, setDirection] = useState([]);

  const updateCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    } else {
      console.log("Geolocation not supported")
    }
    setTime(new Date());
  };

  const toggleDirection = (toggled) => {
    var index = direction.indexOf(toggled);
    if (index === -1) {
      setDirection([...direction, toggled]);
    } else {
      setDirection([...direction.slice(0, index),
                    ...direction.slice(index + 1)]);
    }
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
        <table><tbody>
          <tr><td>Latitude:</td>
              <td>{location && location.coords.latitude}</td></tr>
          <tr><td>Longitude:</td>
              <td>{location && location.coords.longitude}</td></tr>
          <tr><td>Time:</td>
              <td>{time && time.toString()}</td></tr>
        </tbody></table>
      </div>
      <button type="button" onClick={updateCoordinates}>
        Update location and time
      </button>
      <div>
        <p>Viewing directions: {direction.toString()}</p>
      </div>
      <SkyDirections handleClick={toggleDirection} />
    </div>
  );
}

export default App;
