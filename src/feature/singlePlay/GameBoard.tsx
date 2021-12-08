import { Stack, Typography, Paper, TextField, MenuItem, FormControl, Button, Box } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { getFullLoseProbMat } from "../../lib/strategy";
import { handlePlayerTurn, handleAiTurns, PlayLog, getCurrentNum, PlayLogEntry } from "../../lib/gameUtil";

export interface BoardSetting {
    numEnd : number, 
    numCount : number, 
    numPlayer : number, 
    playerTurn : number
}

function NumberNode( 
    props : { 
        log : PlayLogEntry, 
        playerTurn : number 
    }) {
    const {log, playerTurn} = props;
    const {player, lastCall} = log;
    const msg = (playerTurn===player) ? `나   ` : `플레이어 ${player+1}`;
    return <Paper>
        <Typography>{`${msg}: ${lastCall}`}</Typography>
    </Paper>
}

function NumberTree(props: {
        playLog : PlayLog, 
        playerTurn : number
    }) {
    const {playLog, playerTurn} = props;
    return <Stack direction={{xs: "column-reverse"}}>
        {playLog.map((item, idx) => <NumberNode key={idx} log={item} playerTurn={playerTurn}/>)}
    </Stack>
}

export function GameBoard(props: {
        boardSetting : BoardSetting
    }) {
    const {boardSetting} = props;
    const {numEnd, numCount, numPlayer, playerTurn} = boardSetting;
    //core 에서 가져와야함
    const loseMat = useMemo(() => getFullLoseProbMat(numPlayer, numCount, numEnd), [numEnd, numCount, numPlayer]);
    const [numCall, setNumCall] = useState(1);
    const [playLog, setPlayLog] = useState<PlayLog>([]);
    const [gameEnd, setGameEnd] = useState(false);

    const initialize = (loseMat : number[][], numCount : number, playerTurn : number, numEnd : number) : void => {
        // const initialLog = getInitial({loseMat: loseMat, numCount: numCount, playerTurn: playerTurn, numEnd: numEnd})
        // const currentNum = getCurrentNum(initialLog);
        // if (currentNum >= numEnd) {
        //     setGameEnd(true);
        // }
        // setPlayLog(initialLog);
    }

    // initial ai play
    useEffect(() => {
        reset();
        initialize(loseMat, numCount, playerTurn, numEnd);
    }, [numEnd, numCount, numPlayer, playerTurn])

    const reset = () => {
        setPlayLog([]);
        setNumCall(1);
        setGameEnd(false);
        initialize(loseMat, numCount, playerTurn, numEnd);
    }
    
    const handleNumCallChange = (event : any) => {
        const newVal = parseInt(event.target.value)
        setNumCall(newVal);
    }

    const handleCall = (event : any) => {
        if (gameEnd) {
            return;
        }
        // handle player turn
        const playerLogEntry = handlePlayerTurn(playLog, numEnd, playerTurn, numCall);
        if (playerLogEntry.lastCall === numEnd) {
            setPlayLog(playLog.concat(playerLogEntry))
            setGameEnd(true);
            return;
        }
        // after player turn, handle ai turns
        const newPlayLog = handleAiTurns(loseMat, playLog.concat(playerLogEntry), numCall, numEnd, playerTurn);
        const currentNum = getCurrentNum(newPlayLog);
        if (currentNum >= numEnd) {
            setGameEnd(true);
        }
        setPlayLog(newPlayLog);
    }
    
    return <Box sx={{p: 3}}>
        <Box>
            <FormControl sx={{width: "6em"}}>
                <TextField required id="call-num" select label="몇 개 말할까" value={numCall} onChange={handleNumCallChange} >
                    {[...Array(numCount).keys()].map((_, idx) => <MenuItem key={idx+1} value={idx+1}>{idx+1}</MenuItem>)}
                </TextField>
            </FormControl>
            <Button onClick={handleCall}>말하기</Button>
            <Button onClick={reset}>초기화</Button>
        </Box>
        <Box sx={{p: 3, maxWidth: "30rem"}}>
            <NumberTree playLog={playLog} playerTurn={playerTurn}/>
        </Box>
    </Box>
}