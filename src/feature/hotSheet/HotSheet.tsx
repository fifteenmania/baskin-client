import { Box, Button, Divider, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { handleNumberStateChange } from "../common/reactUtil";
import TabDescription from "component/TabDescription";
import HotSheetBoard from "./HotSheetBoard";

export interface HotSheetSetting {
    numPlayer: number,
    maxCall: number,
    numEnd: number
}


export default function HotSheet() {
    const [numPlayer, setNumPlayer] = useState<number>(3);
    const [maxCall, setMaxCall] = useState<number>(3);
    const [numEnd, setNumEnd] = useState<number>(31);
    const [started, setStarted] = useState<boolean>(false);
    const setting = useRef<HotSheetSetting>({numPlayer: 3, maxCall:3, numEnd:31})

    const handleClick = () => {
        setting.current = {
            numPlayer: numPlayer,
            maxCall: maxCall,
            numEnd: numEnd
        }
        setStarted(true);
    }

    return <div>
        <TabDescription >
            한 컴퓨터로 여러 명이 번갈아가며 플레이합니다.
        </TabDescription>
        <Box>
            <Box>
                <TextField required 
                    id="num-player" 
                    label="인원수" 
                    type="number" 
                    value={numPlayer} 
                    onChange={(event) => handleNumberStateChange(event, setNumPlayer)}/>
                <TextField required 
                    id="num-count" 
                    label="최대 말하는 갯수" 
                    type="number" 
                    value={maxCall} 
                    onChange={(event) => handleNumberStateChange(event, setMaxCall)}/>
                <TextField required 
                    id="num-end" 
                    label="마지막 숫자" 
                    type="number" 
                    value={numEnd} 
                    onChange={(event) => handleNumberStateChange(event, setNumEnd)}/>
            </Box>
            <Button onClick={handleClick}>{started? "설정 반영하여 재시작": "게임 시작"}</Button>
            <Divider variant="middle"/>
        {started? <HotSheetBoard setting={setting.current}/> : null}
        </Box>
    </div>
}