import { useState } from 'react';

function PlanetData() {

    const [planetData, setPlanetData] = useState({
        version: "",
        ra:"",
        dec:"",
        mag:"",
        error: "no errors"
    })

    const getPlanetData = async () => {
        try {
            const connection = await fetch("https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27499%27&OBJ_DATA=%27YES%27&MAKE_EPHEM=%27YES%27&EPHEM_TYPE=%27OBSERVER%27&CENTER=%27500@399%27&START_TIME=%272006-01-01%27&STOP_TIME=%272006-01-20%27&STEP_SIZE=%271%20d%27&QUANTITIES=%271,9,20,23,24,29%27%20CSV_FORMAT=%27YES%27");
            const dataFetched = await connection.json();

            let dataRows = dataFetched.result.split("\n");
            let dataRowNeeded = "";
            
            for (let i=0; i<dataRows.length; i++) {
                if (dataRows[i]==="$$SOE") {
                    dataRowNeeded=dataRows[i+1];
                }
            }
            
            let parsedData =dataRowNeeded.split(",");
            for (let i=0; i<parsedData.length; i++) {
                console.log(parsedData[i]);
            }

            setPlanetData({
                ...planetData,
                ra:parsedData[3],
                dec:parsedData[4],
                mag:parsedData[5],
                version: dataFetched.signature.version
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