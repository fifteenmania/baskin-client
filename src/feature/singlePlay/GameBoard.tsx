import { TextField, Button, Box, Checkbox, FormControlLabel } from "@mui/material"
import { AnimationEventHandler, Dispatch, useEffect, useMemo, useState } from "react";
import { getLastPlayer, 
    getFullLoseProbMat, 
    handlePlayerTurn, 
    getCurrentNum, 
    getCurrentPlayer, 
    handleAiTurnOnce } from "baskin-lib";
//types
import {
    PlayLog,
    PlayLogEntry } from "baskin-lib"
import { handleNumberStateChange } from "../common/reactUtil";



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
 * Ui status type.
 * On each `turnStart`, check whether it is ai turn or human turn.
 * If the game is over, go to `gameOver` phase.
 * If it is ai turn, go to `beforeAiInput` phase.
 * If it is human turn, go to `watingHumanInput` phase.
 * After ai or human decide their input and updated playLog, go to `inputAccepted` phase.
 * After all animation finished, go to `turnStart` phase and repeat.
 */
enum UiStatus {
    turnStart,
    beforeAiInput, 
    waitingHumanInput, // pending for user input
    inputAccepted, // input is accepted and wating for animation end.
    gameOver, // gameover state.
}

function NumberRow(props : {
        log : PlayLogEntry, 
        playerTurn : number,
        onAnimationEnd: AnimationEventHandler<HTMLDivElement>
    }) {
    const {log, playerTurn, onAnimationEnd} = props;
    const {player, lastCall} = log;
    const msg = (playerTurn===player) ? "나                " : `플레이어 ${player+1}`;
    return <tr className="number-row" onAnimationEnd={onAnimationEnd}>
        <td className="number-row-player">
            {msg}
        </td>
        <td className="number-row-number">
            {lastCall}
        </td>
    </tr>
}

function NumberTable(props: {
        playLog : PlayLog, 
        playerTurn : number,
        numPlayer: number,
        uiStatus: UiStatus,
        setUiStatus: Dispatch<UiStatus>
    }) {
    const {playLog, playerTurn, numPlayer, uiStatus, setUiStatus} = props;
    // wait until animation finished.
    useEffect(() => {
        if (uiStatus !== UiStatus.inputAccepted) {
            return
        }
        setUiStatus(UiStatus.turnStart)
    }, [uiStatus, setUiStatus, numPlayer, playLog, playerTurn])
    return <table className="number-table">
        <thead>
            <tr>
                <th className="number-row-player">플레이어</th>
                <th className="number-row-number">마지막 말한 숫자</th>
            </tr>
        </thead>
        <tbody>
            {playLog.slice().reverse().map((item) => <NumberRow key={item.lastCall} log={item} playerTurn={playerTurn} onAnimationEnd={() => {}}/>)}
        </tbody>
    </table>
}

function getWinRate(loseMatrix: number[][], pickedNumber: number) {
    return loseMatrix.length > pickedNumber ? 
        1 - loseMatrix[pickedNumber][0] : 
        undefined;
}

function PickedNumber(props: {
        pickedNumber: number,
        winRate: number| undefined,
        showWinRate: boolean,
    }) {
    const {pickedNumber, winRate, showWinRate} = props;
    const winRateText = (winRate === undefined)? 
        "정의되지 않음":
        `${(winRate*100).toFixed(2)} %`
    return <div>
        <span>
            {`말할 숫자: ${pickedNumber} `}
        </span>
        {showWinRate ?
            <span>
                {`/ 예상 승률: ${winRateText} `}
            </span> :
            null
        }
    </div>
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
    const [autoRestart, setAutoRestart] = useState<boolean>(false);
    const [showWinRate, setShowWinRate] = useState<boolean>(false);

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
    // Delay is inserted for better play experience.
    useEffect(() => {
        if (uiStatus !== UiStatus.beforeAiInput) {
            return;
        }
        const delay = Math.random() * 1000 + 200;
        setTimeout(() => {
            setPlayLog((prevPlayLog) => {
                const currentPlayer = getCurrentPlayer(prevPlayLog, numPlayer);
                const newPlayLogElement = handleAiTurnOnce(loseMat, prevPlayLog, maxCall, numEnd, currentPlayer);
                const newPlayLog = prevPlayLog.concat(newPlayLogElement);
                return newPlayLog
            })
        }, delay)
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

    // If auto-restart, reset after gameOver.
    useEffect(() => {
        if (uiStatus !== UiStatus.gameOver) {
            return
        }
        if (autoRestart) {
            reset();
        }
    }, [uiStatus, autoRestart])

    return <Box sx={{p: 3}}>
        <div>
            <FormControlLabel 
                control={<Checkbox
                    value={autoRestart}
                    onChange={() => {setAutoRestart(!autoRestart)}}
                ></Checkbox>}
                label="자동 재시작"
            ></FormControlLabel>
            <FormControlLabel 
                control={<Checkbox
                    value={!showWinRate}
                    onChange={() => {setShowWinRate(!showWinRate)}}
                ></Checkbox>}
                label="예상 승률 보이기"
            ></FormControlLabel>
        </div>
        <div>
            <TextField required 
                id="num-call" 
                label="몇 개 말할까" 
                type="number" 
                value={numCall} 
                onChange={(event) => handleNumberStateChange(event, setNumCall, {maxVal: maxCall, minVal: 1})}
            />
            <Button onClick={handlePlayerCall} disabled={uiStatus===UiStatus.gameOver || uiStatus !== UiStatus.waitingHumanInput}>말하기</Button>
            <Button onClick={reset}>재시작</Button>
        </div>
        <PickedNumber 
            pickedNumber={getCurrentNum(playLog) + numCall}
            winRate={getWinRate(loseMat, getCurrentNum(playLog) + numCall)}
            showWinRate={showWinRate}
        />
        <Box sx={{p: 3, maxWidth: "30rem"}}>
            <NumberTable playLog={playLog} numPlayer={numPlayer} playerTurn={playerTurn} uiStatus={uiStatus} setUiStatus={setUiStatus}/>
        </Box>
    </Box>
}