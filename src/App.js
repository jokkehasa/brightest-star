import { Box, Button, Container, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import GetBrightest from './components/GetBrightest';
import SkyDirections from './components/SkyDirections';
import SkyView from './components/SkyView';
import ChangeDateTime from './components/ChangeDateTime';
import hygData from './hygdata_simplified.json';
import PlanetData from './components/PlanetData';

function dsin(angleInDeg) {
  return Math.sin(angleInDeg * Math.PI / 180);
}
function dcos(angleInDeg) {
  return Math.cos(angleInDeg * Math.PI / 180);
}

function calculateHorizontal(stars, loc, t) {
  /*  H = t - α
    sin(a) = sin(δ) sin(φ) + cos(δ) cos(φ) cos(H)
    sin(A) = - sin(H) cos(δ) / cos(a)
    cos(A) = { sin(δ) - sin(φ) sin(a) } / { cos(φ) cos(a) } */
  const lst = t;  // LST NOT YET IMPLEMENTED!!
  const lat = loc.coords.latitude;
  return stars.map(({ id, ra, dec, mag }) => {
    // sine of local hour angle
    const sinH = Math.sin((lst - ra) * Math.PI / 12);
    // cosine of local hour angle
    const cosH = Math.cos((lst - ra) * Math.PI / 12);
    // sine of altitude
    const sinAlt = dsin(dec) * dsin(lat) + dcos(dec) * dcos(lat) * cosH;
    // sine of azimuth
    const sinAz = -sinH * dcos(dec) / Math.sqrt(1 - sinAlt**2);
    return ({
      id: id,
      az: Math.asin(sinAz) / Math.PI * 180,
      alt: Math.asin(sinAlt) / Math.PI * 180,
      mag: mag,
    });
  });
}

function App() {

  const [location, setLocation] = useState(null);
  const [time, setTime] = useState(null);
  const [direction, setDirection] = useState({
    N: false,
    S: false,
    W: false,
    E: false,
    Z: false
  });
  const [starData, setStarData] = useState(hygData);

  const [visibility, setVisibility] = useState(40);

  const handleVisibilityChange = (event, newValue) => {
    setVisibility(newValue);
    console.log(visibility)
  }

  const updateCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    } else {
      console.log("Geolocation not supported")
    }
    setTime(new Date());
  };

  const toggleDirection = (toggled) => {
    var tempBool = direction[toggled];
    (tempBool)
      ? tempBool = false
      : tempBool = true
    setDirection({ ...direction, [toggled]: tempBool })
  };

  useEffect(() => {
    updateCoordinates();
  }, [])

  useEffect(() => {
    console.log(direction);

  }, [direction])

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
            <TableRow>
              <TableCell>Time: </TableCell>
              <TableCell>{<ChangeDateTime time={time} setTime={setTime}/>}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" sx={{ mb: 2, mt: 2 }} onClick={updateCoordinates}>
        Update location and time
      </Button>
      <GetBrightest starData={starData} />
      <Typography>Viewing directions</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
        {Object.keys(direction).map((dir) => {
          return (
            <Paper key={dir} style={{ textAlign: 'center', width: 50, height: 50, }}>
              <Typography
                key={dir}
                sx={{ p: "15px" }}
                color={
                  (direction[dir])
                    ? "black"
                    : "lightGrey"
                }
              >
                {dir}
              </Typography>
            </Paper>
          )
        })}
      </Box>
      <SkyDirections handleClick={toggleDirection} />
      <Typography>Visibility</Typography>
      <Slider
        value={visibility}
        step={1}
        min={-10}
        max={60}
        onChange={handleVisibilityChange} />
      <SkyView
      /*  stars={location
          ? calculateHorizontal(starData, location, time.getHours())
          : []
        }*/
        stars={starData}
        latitude={location ? location.coords.latitude : 90}
        lst={time ? time.getHours() + time.getMinutes()/60 : 0}  // TODO: Get the actual LST
        visibility={visibility} />
        <PlanetData/>
    </Container >
  );
}

export default App;
