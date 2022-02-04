import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SkyDirections from './components/SkyDirections';
import SkyView from './components/SkyView';

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
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Latitude: </TableCell>
              <TableCell>{location && location.coords.latitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Longitude: </TableCell>
              <TableCell>{location && location.coords.longitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Time: </TableCell>
              <TableCell>{time && time.toString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained"  style={{marginBottom:50, marginTop:50}} onClick={updateCoordinates}>
        Update location and time
      </Button>
      <Typography>Viewing directions: {direction.toString()}</Typography>
      <SkyDirections handleClick={toggleDirection} />
      <SkyView />
    </Container>
  );
}

export default App;
