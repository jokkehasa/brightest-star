import { useState } from "react";
import { Button, Typography } from "@mui/material";

function GetBrightest(props) {

    const [brightest, setBrightest] = useState();

    const brightestStarName = () => {
        let tempStarIdx = null;
        let MAGvalue = 1000;
        for (let i = 0; i < props.starData.length; i++) {
            if (props.starData[i].mag < MAGvalue) {
                tempStarIdx=i;
                MAGvalue=props.starData[i].mag;
            }
        }
        setBrightest(props.starData[tempStarIdx].proper);
    }

    return (
        <div>
            <Button variant="contained" sx={{ mb: 2, mt: 2 }} onClick={brightestStarName}>Show Brightest star</Button>
            <Typography sx={{ mb: 2, mt: 2 }}>{`Brightest star is: ${brightest}`}</Typography>
        </div>
    );
}

export default GetBrightest;