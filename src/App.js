import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import GetBrightest from './components/GetBrightest';
import SkyDirections from './components/SkyDirections';
import SkyView from './components/SkyView';
import rawData from './hygdata_v3_brightest.json';

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
  const [starData, setStarData] = useState();

  useEffect(() => {
    setStarData(rawData.results);
  }, [])

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
      <SkyView />
    </Container >
  );
}

export default App;
