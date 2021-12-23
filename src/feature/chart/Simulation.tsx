import { TextField, Divider, Box } from "@mui/material";
import { lazy, Suspense, useState } from "react";
import ChartSuspense from "./ChartSuspense";
import ChartBox from "./Chart";
//const ChartBox = lazy(() => import("./Chart"));

function Simulation() {
    const [numPlayer, setNumPlayer] = useState(3);
    const [numCount, setNumCount] = useState(3);
    const [numEnd, setNumEnd] = useState(31);

    const parseEvent = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => parseInt(event.target.value);

    const width = 600;
    const height = 600;

    return <div>
        <Box sx={{paddingBottom: "2.5rem"}}>
            <TextField required id="num-player" label="인원수" type="number" value={numPlayer} onChange={(event) => setNumPlayer(parseEvent(event))}/>
            <TextField required id="num-count" label="최대 말하는 갯수" type="number" value={numCount} onChange={(event) => setNumCount(parseEvent(event))}/>
            <TextField required id="num-end" label="마지막 숫자" type="number" value={numEnd} onChange={(event) => setNumEnd(parseEvent(event))}/>
        </Box>
        <Divider variant="middle"/>
        <Suspense fallback={<ChartSuspense width={width} height={height}/>}>
            <ChartBox numPlayer={numPlayer} numCount={numCount} numEnd={numEnd} width={width} height={height}/>
        </Suspense>
    </div>
}

export default Simulation