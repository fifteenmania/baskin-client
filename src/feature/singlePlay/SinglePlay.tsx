import { Button, MenuItem, TextField, FormControl, Divider, Box } from "@mui/material";
import { useState } from "react";
import { handleNumberSelectChange, handleNumberStateChange } from "../common/reactUtil";
import TabDescription from "component/TabDescription";
import { GameBoard, BoardSetting }  from "./GameBoard";
import './style.css'

function SinglePlay() {
    const [numPlayer, setNumPlayer] = useState<number>(3);
    const [maxCall, setMaxCall] = useState<number>(3);
    const [numEnd, setNumEnd] = useState<number>(31);
    const [playerTurn, setPlayerTurn] = useState<number>(0);

    const [numSetting, setNumSetting] =  useState<BoardSetting>({numPlayer: 3, maxCall: 3, numEnd:31, playerTurn: 0});
    const [started, setStarted] = useState<boolean>(false);

    const handleClick = () => {
        setNumSetting({
            numPlayer : numPlayer,
            maxCall : maxCall,
            numEnd : numEnd,
            playerTurn : playerTurn
        });
        setStarted(true);
    }

    return <div>
        <TabDescription>
            인공지능과 플레이합니다. 
            인공지능은 매 턴 최적 전략을 구사합니다.
        </TabDescription> 
        <Box>
            <Box>
                <TextField required 
                    id="num-player" 
                    label="인원수" 
                    type="number" 
                    value={numPlayer} 
                    onChange={(event) => handleNumberStateChange(event, setNumPlayer, {minVal: 1, maxVal: 1000})}
                    onFocus={(event) => (event.target.select())}
                />
                <TextField required 
                    id="num-count" 
                    label="최대 말하는 갯수" 
                    type="number" 
                    value={maxCall} 
                    onChange={(event) => handleNumberStateChange(event, setMaxCall, {minVal: 1, maxVal: numEnd})}
                    onFocus={(event) => (event.target.select())}    
                />
                <TextField required 
                    id="num-end" 
                    label="마지막 숫자" 
                    type="number" 
                    value={numEnd} 
                    onChange={(event) => handleNumberStateChange(event, setNumEnd, {minVal: 1, maxVal: 3000})}
                    onFocus={(event) => (event.target.select())}
                />
                <FormControl sx={{width: "6em"}}>
                    <TextField required id="num-my" label="나의 순서" select value={playerTurn} onChange={(event => handleNumberSelectChange(event, setPlayerTurn))} >
                        {[...Array(numPlayer).keys()].map((_, idx) => <MenuItem key={idx} value={idx}>{idx+1}</MenuItem>)}
                    </TextField>
                </FormControl>
            </Box>
            <Button onClick={handleClick}>{started? "설정 반영하여 재시작": "게임 시작"}</Button>
        </Box>
        <Divider variant="middle"/>
        {started? <GameBoard boardSetting={numSetting}/> : null}
    </div>
}

export default SinglePlay