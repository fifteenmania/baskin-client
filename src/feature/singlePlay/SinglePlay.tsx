import { Button, MenuItem, TextField, FormControl, Divider, Box } from "@mui/material";
import { useState } from "react";
import { handleNumberStateChange } from "../common/reactUtil";
import { GameBoard, BoardSetting }  from "./GameBoard";

function SinglePlay() {
    const [numPlayer, setNumPlayer] = useState<number>(3);
    const [numCount, setNumCount] = useState<number>(3);
    const [numEnd, setNumEnd] = useState<number>(31);
    const [numMy, setNumMy] = useState<number>(0);

    const [numSetting, setNumSetting] =  useState<BoardSetting>({numPlayer: 3, numCount: 3, numEnd:31, playerTurn: 0});
    const [started, setStarted] = useState<boolean>(false);

    const handleClick = () => {
        setNumSetting(numSetting);
        setStarted(true);
    }


    return <div>
        <Box>
            <Box>
                <TextField required id="num-player" label="인원수" type="number" value={numPlayer} onChange={(event) => handleNumberStateChange(event, setNumPlayer)}/>
                <TextField required id="num-count" label="최대 말하는 갯수" type="number" value={numCount} onChange={(event) => handleNumberStateChange(event, setNumCount)}/>
                <TextField required id="num-end" label="마지막 숫자" type="number" value={numEnd} onChange={(event) => handleNumberStateChange(event, setNumEnd)}/>
                <FormControl sx={{width: "6em"}}>
                    <TextField required id="num-my" label="나의 순서" select value={numMy} onChange={(event) => handleNumberStateChange(event, setNumMy)} >
                        {[...Array(numPlayer).keys()].map((_, idx) => <MenuItem key={idx} value={idx}>{idx+1}</MenuItem>)}
                    </TextField>
                </FormControl>
            </Box>
            <Button onClick={handleClick}>{started? "설정 변경": "게임 시작"}</Button>
        </Box>
        <Divider variant="middle"/>
        {started? <GameBoard boardSetting={numSetting}/> : null}
    </div>
}

export default SinglePlay