import { Stack, Typography, TextField, MenuItem, FormControl, Button, Box } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLastPlayer, 
    getFullLoseProbMat, 
    handlePlayerTurn, 
    handleAiTurns, 
    getCurrentNum, 
    getCurrentPlayer, 
    handleAiTurnOnce } from "baskin-lib";
//types
import {
    PlayLog,
    PlayLogEntry } from "baskin-lib"
import { handleNumberSelectChange } from "../common/reactUtil";



/**
 * @param numEnd
 * @param numCount maximum number of numbers can call in one turn
 * @param numPlayer
 * @param playerTurn 
 */
export interface BoardSetting {
    numEnd : number, 
    maxCall : number, 
    numPlayer : number, 
    playerTurn : number
}

/**
 * Ui status regarding animations.
 * On ai turn, skip `inputAccepted` phase.
 * After every ui animation is finished, set on turnEnd phase.
 * Check gameover on every turnStart phase.
 */
enum UiStatus {
    turnStart,
    waitingInput, // pending for user input
    inputAccepted, // input is accepted and wating for animation end.
    gameOver, // gameover state.
}

function NumberNode( 
    props : {
        log : PlayLogEntry, 
        playerTurn : number,
    }) {
    const {log, playerTurn} = props;
    const {player, lastCall} = log;
    const msg = (playerTurn===player) ? `나   ` : `플레이어 ${player+1}`;
    return <div className="number-node" >
        <Typography>{`${msg}: ${lastCall}`}</Typography>
    </div>
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
    const {numEnd, maxCall, numPlayer, playerTurn} = boardSetting;
    const loseMat = useMemo(() => getFullLoseProbMat(numPlayer, maxCall, numEnd), [numEnd, maxCall, numPlayer]);
    const [numCall, setNumCall] = useState(1);
    const [playLog, setPlayLog] = useState<PlayLog>([]);
    const [uiStatus, setUiStatus] = useState<UiStatus>(UiStatus.turnStart);

    const reset = useCallback(() => {
        setPlayLog([]);
        setNumCall(1);
        setUiStatus(UiStatus.turnStart);
    }, [])

    const printGameOver = (playLog: PlayLog, playerTurn: number) => {
        const lastPlayer = getLastPlayer(playLog);
        if (lastPlayer === undefined) {
            alert("Invalid game setting. Change game settings.")
            return
        }
        if (lastPlayer === playerTurn) {
            alert("You lose!");
        } else {
            alert(`You win! player ${lastPlayer+1} lose`)
        }
    }

    useEffect(() => {
        reset();
    }, [boardSetting, reset])

    // handle turn start.
    useEffect(() => {
        if (uiStatus !== UiStatus.turnStart) {
            return;
        }
        console.log("turn start")
        const currentNumber = getCurrentNum(playLog);
        // check gameover.
        if (currentNumber === numEnd) {
            printGameOver(playLog, playerTurn);
            setUiStatus(UiStatus.gameOver);
            return;
        }
        // check if it is player turn.
        const currentPlayer = getCurrentPlayer(playLog, numPlayer);
        if (currentPlayer === playerTurn) {
            console.log("player turn")
            setUiStatus(UiStatus.waitingInput);
            return;
        }
        // handle ai turn.
        const newPlayLogElement = handleAiTurnOnce(loseMat, playLog, maxCall, numEnd, currentPlayer);
        const newPlayLog = playLog.concat(newPlayLogElement);
        setPlayLog(newPlayLog);
        return;
    }, [uiStatus, playLog, maxCall, numEnd, loseMat, numPlayer, playerTurn])

    // After playlog update, wait until animation end.
    useEffect(() => {
        if (playLog.length === 0) {
            return;
        }
        if (uiStatus !== UiStatus.turnStart && uiStatus !== UiStatus.waitingInput) {
            return;
        }
        console.log("input accepted")
        console.log(playLog);
        setUiStatus(UiStatus.inputAccepted);
    }, [playLog, uiStatus])

    // handle user input
    const handlePlayerCall = () => {
        if (uiStatus !== UiStatus.waitingInput) {
            return
        }
        const playerPlayLog = handlePlayerTurn(playLog, numCall, numEnd, playerTurn);
        setPlayLog(playerPlayLog);
    }
    
    return <Box sx={{p: 3}}>
        <Box>
            <FormControl sx={{width: "6em"}}>
                <TextField required id="call-num" select label="몇 개 말할까" value={numCall} onChange={(event) => handleNumberSelectChange(event, setNumCall)} >
                    {[...Array(maxCall).keys()].map((_, idx) => <MenuItem key={idx+1} value={idx+1}>{idx+1}</MenuItem>)}
                </TextField>
            </FormControl>
            <Button onClick={handlePlayerCall}>말하기</Button>
            <Button onClick={reset}>초기화</Button>
        </Box>
        <Box sx={{p: 3, maxWidth: "30rem"}}>
            <NumberTree playLog={playLog} playerTurn={playerTurn}/>
        </Box>
    </Box>
}