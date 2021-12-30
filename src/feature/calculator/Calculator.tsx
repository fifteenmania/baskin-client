import { Box, Divider, TextField } from "@mui/material";
import { lazy, Suspense, useState } from "react";
import TabDescription from "component/TabDescription";
import ChartSuspense from "./ChartSuspense";
import { handleNumberStateChange } from "feature/common/reactUtil";
const ChartBox = lazy(() => import("./Chart"));

function Calculator() {
    const [numPlayer, setNumPlayer] = useState(3);
    const [maxCall, setMaxCall] = useState(3);
    const [numEnd, setNumEnd] = useState(31);

    const width = 600;
    const height = 600;

    return <div>
        <TabDescription>
            숫자에 따른 이론적 승률을 계산해서 보여줍니다.
        </TabDescription> 
        <Box sx={{paddingBottom: "2.5rem"}}>
            <TextField required id="num-player" label="인원수" type="number" value={numPlayer} onChange={(event) => handleNumberStateChange(event, setNumPlayer)}/>
            <TextField required id="max-call" label="최대 말하는 갯수" type="number" value={maxCall} onChange={(event) => handleNumberStateChange(event, setMaxCall, { minVal : 1, maxVal : numEnd })}/>
            <TextField required id="num-end" label="마지막 숫자" type="number" value={numEnd} onChange={(event) => handleNumberStateChange(event, setNumEnd)}/> 
        </Box>
        <Divider variant="middle" />
        <Suspense fallback={<ChartSuspense width={width} height={height}/>}>
            <ChartBox numPlayer={numPlayer} maxCall={maxCall} numEnd={numEnd} width={width} height={height}/>
        </Suspense>
    </div>
}

export default Calculator