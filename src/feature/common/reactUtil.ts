import { ChangeEvent, Dispatch, SetStateAction } from "react";

/**
 * @description update state as user change input.
 * if input is not a positive integer, set as 0.
 * @param event Html change event
 * @param setState state setter
 */
export function handleNumberStateChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: Dispatch<SetStateAction<number>>): void {
    const newVal = parseInt(event.currentTarget.value);
    if (isNaN(newVal) || newVal < 0) {
        setState(0);
        return;
    }
    setState(newVal);
}
