import { Stack, Typography, TextField, MenuItem, FormControl, Button, Box } from "@mui/material"
import { AnimationEventHandler, Dispatch, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    beforeAiInput, 
    waitingHumanInput, // pending for user input
    inputAccepted, // input is accepted and wating for animation end.
    gameOver, // gameover state.
}

function NumberNode( 
    props : {
        log : PlayLogEntry, 
        playerTurn : number,
        onAnimationEnd: AnimationEventHandler<HTMLDivElement>
    }) {
    const {log, playerTurn, onAnimationEnd} = props;
    const {player, lastCall} = log;
    const msg = (playerTurn===player) ? `나   ` : `플레이어 ${player+1}`;
    return <div className="number-node" onAnimationEnd={onAnimationEnd}>
        <Typography>{`${msg}: ${lastCall}`}</Typography>
    </div>
}

function NumberTree(props: {
        playLog : PlayLog, 
        playerTurn : number,
        uiStatus: UiStatus,
        setUiStatus: Dispatch<UiStatus>
    }) {
    const {playLog, playerTurn, uiStatus, setUiStatus} = props;
    useEffect(() => {
        if (uiStatus === UiStatus.inputAccepted) {
            setUiStatus(UiStatus.turnStart);
        }
    }, [uiStatus])
    return <Stack direction={{xs: "column-reverse"}}>
        {playLog.map((item, idx) => <NumberNode key={idx} log={item} playerTurn={playerTurn} onAnimationEnd={() => {}}/>)}
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
    // act as global lock for ui
    const [uiStatus, setUiStatus] = useState<UiStatus>(UiStatus.turnStart);

    const reset = () => {
        console.log("reset")
        setUiStatus(() => {
            setPlayLog([]);
            setNumCall(1);
            return UiStatus.turnStart
        });
    }

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

    // reset when game settings change.
    useEffect(() => {
        reset();
    }, [boardSetting])

    // On each turn start, check if it is player turn or game over
    useEffect(() => {
        if (uiStatus !== UiStatus.turnStart) {
            return;
        }
        console.log("turn start")
        const currentNumber = getCurrentNum(playLog);
        if (currentNumber === numEnd) {
            printGameOver(playLog, playerTurn);
            setUiStatus(UiStatus.gameOver);
            return;
        }
        const currentPlayer = getCurrentPlayer(playLog, numPlayer);
        if (currentPlayer === playerTurn) {
            console.log("player turn")
            setUiStatus(UiStatus.waitingHumanInput);
            return;
        }
        console.log("ai turn")
        setUiStatus(UiStatus.beforeAiInput);
    }, [uiStatus, playLog, numPlayer, numEnd, playerTurn])

    // Handle Ai turn.
    useEffect(() => {
        if (uiStatus !== UiStatus.beforeAiInput) {
            return;
        }
        setPlayLog((prevPlayLog) => {
            const currentPlayer = getCurrentPlayer(prevPlayLog, numPlayer);
            const newPlayLogElement = handleAiTurnOnce(loseMat, prevPlayLog, maxCall, numEnd, currentPlayer);
            const newPlayLog = prevPlayLog.concat(newPlayLogElement);
            return newPlayLog
        })
        return;
    }, [uiStatus, maxCall, numEnd, loseMat, numPlayer, playerTurn])

    // Handle user input
    const handlePlayerCall = () => {
        if (uiStatus !== UiStatus.waitingHumanInput) {
            return
        }
        const playerPlayLog = handlePlayerTurn(playLog, numCall, numEnd, playerTurn);
        setPlayLog(playerPlayLog);
    }
    
    // After playLog updates, wait until animation end.
    useEffect(() => {
        if (playLog.length === 0) {
            return;
        }
        console.log("input accepted, waiting animation")
        setUiStatus(UiStatus.inputAccepted);
    }, [playLog])

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
            <NumberTree playLog={playLog} playerTurn={playerTurn} uiStatus={uiStatus} setUiStatus={setUiStatus}/>
        </Box>
    </Box>
}