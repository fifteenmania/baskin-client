import { Box, Divider, TextField } from "@mui/material";
import { useState } from "react"
import { handleNumberStateChange } from "../common/reactUtil";

function Calculator() {
    const [numPlayer, setNumPlayer] = useState(3);
    const [maxCall, setMaxCall] = useState(3);
    const [numEnd, setNumEnd] = useState(31);

    return <div>
        <Box sx={{paddingBottom: "2.5rem"}}>
            <TextField required id="num-player" label="인원수" type="number" value={numPlayer} onChange={(event) => handleNumberStateChange(event, setNumPlayer)}/>
            <TextField required id="max-call" label="최대 말하는 갯수" type="number" value={maxCall} onChange={(event) => handleNumberStateChange(event, setMaxCall)}/>
            <TextField required id="num-end" label="마지막 숫자" type="number" value={numEnd} onChange={(event) => handleNumberStateChange(event, setNumEnd)}/> 
        </Box>
        <Divider variant="middle" />
    </div>
}

export default Calculator