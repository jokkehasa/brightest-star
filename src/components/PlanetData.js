import { useState } from 'react';
import { format } from 'date-fns';

function PlanetData(props) {

    const [planetData, setPlanetData] = useState({
        mars: {
            version: "",
            ra: "",
            dec: "",
            mag: "",
        },
        venus: {
            version: "",
            ra: "",
            dec: "",
            mag: "",
        },
        mercury: {
            version: "",
            ra: "",
            dec: "",
            mag: "",
        },
        jupiter: {
            version: "",
            ra: "",
            dec: "",
            mag: "",
        },
        saturn: {
            version: "",
            ra: "",
            dec: "",
            mag: "",
        },
        error: "no errors"
    });

    const parseData = (data) => {

        let dataRows = data.result.split("\n");
        let dataRowNeeded = "";

        for (let i = 0; i < dataRows.length; i++) {
            if (dataRows[i] === "$$SOE") {
                dataRowNeeded = dataRows[i + 1];
            }
        }

        let parsedData = dataRowNeeded.split(",");
        for (let i = 0; i < parsedData.length; i++) {
        }

        let ra = parsedData[3].trim().split(" ").map((x, i) => x / 60 ** i).reduce(
            (previousValue, currentValue) => previousValue + currentValue, 0
        );

        let dec = parsedData[4].trim().split(" ").map((x, i) => x / 60 ** i).reduce(
            (previousValue, currentValue) => previousValue + currentValue, 0
        );

        let mag = Number(parsedData[5]);

        return { ra: ra, dec: dec, mag: mag, version: data.signature.version };
    }

    const getPlanetData = async () => {
        //TEST TIME TO USE: "2006-01-01"
        let time = format(props.time, "yyyy-MM-dd'%20'HH:mm:ss");
        console.log(time);

        try {
            //Mars: 499
            const marsConnection = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27499%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&TLIST=%27${time}%27&QUANTITIES=%271,9%27&CSV_FORMAT=%27YES%27`);
            const marsDataFetched = await marsConnection.json();
            //Venus: 299
            const venusConnection = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27299%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&TLIST=%27${time}%27&QUANTITIES=%271,9%27&CSV_FORMAT=%27YES%27`);
            const venusDataFetched = await venusConnection.json();
            //Mercury: 199
            const mercuryConnection = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27199%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&TLIST=%27${time}%27&QUANTITIES=%271,9%27&CSV_FORMAT=%27YES%27`);
            const mercuryDataFetched = await mercuryConnection.json();
            //Jupiter: 599
            const jupiterConnection = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27599%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&TLIST=%27${time}%27&QUANTITIES=%271,9%27&CSV_FORMAT=%27YES%27`);
            const jupiterDataFetched = await jupiterConnection.json();
            //Saturn: 699
            const saturnConnection = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27699%27&OBJ_DATA=%27NO%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&TLIST=%27${time}%27&QUANTITIES=%271,9%27&CSV_FORMAT=%27YES%27`);
            const saturnDataFetched = await saturnConnection.json();

            let mars = (parseData(marsDataFetched));
            let venus = (parseData(venusDataFetched));
            let mercury = (parseData(mercuryDataFetched));
            let jupiter = (parseData(jupiterDataFetched));
            let saturn = (parseData(saturnDataFetched));

            setPlanetData({
                ...planetData,
                mars:mars,
                venus:venus,
                mercury:mercury,
                jupiter:jupiter,
                saturn:saturn
            })
        } catch (error) {
            setPlanetData({
                ...planetData,
                error: error
            })
        }
    }

    const planetToConsole = () => {
        console.log(planetData);
        props.updatePlanetData(planetData);
    }

    return (
        <p>
            <button onClick={getPlanetData}>
                Get Planet Data
            </button>
            <button onClick={planetToConsole}>
                Planet Data to Console
            </button>
        </p>
    )
}

export default PlanetData;