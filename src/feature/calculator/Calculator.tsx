import { Box, Divider, TextField } from "@mui/material";
import { lazy, Suspense, useState } from "react";
import TabDescription from "component/TabDescription";
import ChartSuspense from "./ChartSuspense";
const ChartBox = lazy(() => import("./Chart"));

function Calculator() {
    const [numPlayer, setNumPlayer] = useState(3);
    const [maxCall, setMaxCall] = useState(3);
    const [numEnd, setNumEnd] = useState(31);

    const parseEvent = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => parseInt(event.target.value);

    const width = 600;
    const height = 600;

    return <div>
        <TabDescription>
            숫자에 따른 이론적 승률을 계산해서 보여줍니다.
        </TabDescription> 
        <Box sx={{paddingBottom: "2.5rem"}}>
            <TextField required id="num-player" label="인원수" type="number" value={numPlayer} onChange={(event) => setNumPlayer(parseEvent(event))}/>
            <TextField required id="max-call" label="최대 말하는 갯수" type="number" value={maxCall} onChange={(event) => setMaxCall(parseEvent(event))}/>
            <TextField required id="num-end" label="마지막 숫자" type="number" value={numEnd} onChange={(event) => setNumEnd(parseEvent(event))}/> 
        </Box>
        <Divider variant="middle" />
        <Suspense fallback={<ChartSuspense width={width} height={height}/>}>
            <ChartBox numPlayer={numPlayer} maxCall={maxCall} numEnd={numEnd} width={width} height={height}/>
        </Suspense>
    </div>
}

export default Calculator