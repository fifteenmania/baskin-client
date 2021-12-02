import { vecFindMin, vecNormalize } from "./linarg";

/**
 * 
 * @param loseProb Lose rate of available choices. 
 * - ex. [.1, .2, .7] : lose rate .1 after calling 1 number,
 *      lose rate .2 after calling 2 number,
 *      lose rate .7 after calling 3 number.
 * @param options Optional settings
 * @param options.target Target to kill. Maximize the lose rate of target.
 * @param options.absTol Arithematic error tolerance on comparison.
 * @returns Optimal choose rate for each choice.
 */
export function getChooseProb(loseProb: number[], {absTol=10e-5}: {target?: number, absTol?: number} = {} ): number[] {
    const lowest = vecFindMin(loseProb);
    const check = loseProb.map((x) => Math.abs(x - lowest) < absTol ? 1: 0);
    const result = vecNormalize(check);
    return result;
}

/**
 * 
 * @param numPlayer Number of players
 * @param maxCount Maximam number of numbers player can call on his turn.
 * @param numEnd Final number of the game.
 * @returns ((numEnd + 1) x (numPlayer)) matrix. 
 */
export function getLoseProbMat(numPlayer: number, maxCount: number, numEnd: number): number[][] {
    return [[]];
}
