import { ChangeEvent, Dispatch, SetStateAction } from "react";

/**
 * @description update state as user change input.
 * if input is not a positive integer, set as 0.
 * @param event Html change event
 * @param setState state setter
 */
export function handleNumberStateChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: Dispatch<SetStateAction<number>>, option: {minVal: number, maxVal: number} = {minVal: 0, maxVal:1000}): void {
    const newVal = parseInt(event.currentTarget.value);
    const {minVal, maxVal} = option;
    if (isNaN(newVal) || newVal < minVal) {
        setState(minVal);
        return;
    }
    if (newVal > maxVal) {
        setState(maxVal);
        return;
    }
    setState(newVal);
}

export function handleNumberSelectChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: Dispatch<SetStateAction<number>>): void {
    const newVal = parseInt(event.target.value);
    setState(newVal);
}
