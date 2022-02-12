import { useState } from "react";
import { Button, Typography } from "@mui/material";

function GetBrightest(props) {

    const [kirkkain, setKirkkain] = useState();

    const brightestStarName = () => {
        let tempStarIdx = null;
        let MAGvalue = 1000;
        for (let i = 0; i < props.starData.length; i++) {
            if (props.starData[i].mag < MAGvalue) {
                tempStarIdx=i;
                MAGvalue=props.starData[i].mag;
            }
        }
        setKirkkain(props.starData[tempStarIdx].proper);
    }

    return (
        <div>
            <Button variant="contained" sx={{ mb: 2, mt: 2 }} onClick={brightestStarName}>Näytä kirkkain tähti</Button>
            <Typography sx={{ mb: 2, mt: 2 }}>{`Kirkkain tähti on: ${kirkkain}`}</Typography>
        </div>
    );
}

export default GetBrightest;