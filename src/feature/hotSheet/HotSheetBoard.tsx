import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { AnimationEventHandler, useState } from "react";
import { HotSheetSetting } from "./HotSheet";
import { getCurrentNum, getCurrentPlayer, getLastPlayer, makePlayLogEntry, PlayLog, PlayLogEntry } from "baskin-lib";
import { handleNumberStateChange } from "feature/common/reactUtil";
import { useEffect } from "react";
import { Dispatch } from "react";

 enum UiStatus {
    turnStart,
    waitingHumanInput, // pending for user input
    inputAccepted, // input is accepted and wating for animation end.
    gameOver, // gameover state.
}


function NumberRow(props : {
        log : PlayLogEntry, 
        onAnimationEnd: AnimationEventHandler<HTMLDivElement>
    }) {
    const {log, onAnimationEnd} = props;
    const {player, lastCall} = log;
    return <tr className="number-row" onAnimationEnd={onAnimationEnd}>
        <td className="number-row-player">
            {`플레이어 ${player+1}`}
        </td>
        <td className="number-row-number">
            {lastCall}
        </td>
    </tr>
}

function NumberTable(props: {
        playLog : PlayLog, 
        uiStatus: UiStatus,
        setUiStatus: Dispatch<UiStatus>
    }) {
    const {playLog, uiStatus, setUiStatus} = props;
    useEffect(() => {
        if (uiStatus === UiStatus.inputAccepted) {
            setUiStatus(UiStatus.turnStart);
        }
    }, [uiStatus, setUiStatus])
    return <table className="number-table">
        <thead>
            <tr>
                <th className="number-row-player">플레이어</th>
                <th className="number-row-number">마지막 말한 숫자</th>
            </tr>
        </thead>
        <tbody>
            {playLog.map((item, idx) => <NumberRow key={idx} log={item} onAnimationEnd={() => {}}/>)}
        </tbody>
    </table>
}

function PickedNumber(props: {
        pickedNumber: number,
    }) {
    const {pickedNumber} = props;
    return <div>
        <span>
            {`말할 숫자: ${pickedNumber} `}
        </span>
    </div>
}

export default function HotSheetBoard(props: {setting: HotSheetSetting}) { 
    const {numEnd, numPlayer, maxCall} = props.setting;
    const [numCall, setNumCall] = useState(1);
    const [playLog, setPlayLog] = useState<PlayLog>([]);
    // act as global lock for ui
    const [uiStatus, setUiStatus] = useState<UiStatus>(UiStatus.turnStart);
    const [autoRestart, setAutoRestart] = useState<boolean>(false);

    const reset = () => {
        console.log("reset")
        setUiStatus(() => {
            setPlayLog([]);
            setNumCall(1);
            return UiStatus.turnStart
        });
    }

    const printGameOver = (playLog: PlayLog) => {
        const lastPlayer = getLastPlayer(playLog);
        if (lastPlayer === undefined) {
            alert("Invalid game setting. Change game settings.")
            return
        }
        alert(`player ${lastPlayer+1} lose`)
    }

    useEffect(() => {
        if (uiStatus !== UiStatus.turnStart) {
            return;
        }
        const currentNum = getCurrentNum(playLog);
        if (currentNum >= numEnd) {
            setUiStatus(UiStatus.gameOver);
            printGameOver(playLog)
            return;
        }
        setUiStatus(UiStatus.waitingHumanInput);
    }, [uiStatus, numEnd, playLog])

    // Handle user input
    const handlePlayerCall = () => {
        if (uiStatus !== UiStatus.waitingHumanInput) {
            return
        }
        const currentPlayer = getCurrentPlayer(playLog, numPlayer);
        const currentNum = getCurrentNum(playLog);
        const playerPlayLogEntry = makePlayLogEntry(currentNum + numCall, numEnd, currentPlayer);
        const playerPlayLog = playLog.concat(playerPlayLogEntry);
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
        </div>
        <div>
            <TextField required 
                id="num-call" 
                label="몇 개 말할까" 
                type="number" 
                value={numCall} 
                onChange={(event) => handleNumberStateChange(event, setNumCall, {maxVal: maxCall, minVal: 1})}
            />
            <Button onClick={handlePlayerCall} disabled={uiStatus===UiStatus.gameOver}>말하기</Button>
            <Button onClick={reset}>재시작</Button>
        </div>
        <PickedNumber pickedNumber={getCurrentNum(playLog) + numCall} />
        <Box sx={{p: 3, maxWidth: "30rem"}}>
            <NumberTable playLog={playLog} uiStatus={uiStatus} setUiStatus={setUiStatus}/>
        </Box>
    </Box>
}