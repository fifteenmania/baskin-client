import { getUnitVec, matShiftToLast, sliceRev, vecFindMin, vecMatDot, vecNormalize, vecVecDot } from "./linarg";
import { defaultLoseRate, nextTurnLoseRate, VecModifier } from "./modifier";

export interface StrategyOption {
    vecModifier?: VecModifier,
    matRev?: boolean
}

/**
 * 
 * @param loseVec Lose rate of available choices. Act as a minimization objective. 
 *      - ex. [.1, .2, .7] : lose rate .1 after calling 1 number,
 *      lose rate .2 after calling 2 number,
 *      lose rate .7 after calling 3 number. 
 *      Thus, AI will call 3 numbers.
 * @param options Optional settings
 * @param options.absTol Arithematic error tolerance on comparison.
 * @returns Optimal choose rate for each choice.
 */
export function getChooseProb(loseVec: number[], {absTol=10e-5}: {absTol?: number} = {}): number[] {
    const lowest = vecFindMin(loseVec);
    const check = loseVec.map((x) => Math.abs(x - lowest) < absTol ? 1: 0);
    const result = vecNormalize(check);
    return result;
}

export function getLookupMat(loseMat: number[][], maxCall: number, currentNum: number, {matRev=false}: {matRev: boolean}) {
    const startRow = currentNum+1;
    const endRow = Math.min(loseMat.length, currentNum+maxCall+1);
    const lookupMat = matRev? sliceRev(loseMat, startRow, endRow): loseMat.slice(startRow, endRow);
    return lookupMat;
}

/**
 * 
 * @param loseMat 
 * @param maxCall 
 * @param currentNum 
 * @param options
 * @param options.vecModifier Apply modifier to lose rate vector. For setting kill target, improving player win rate, etc.
 * @returns (Modified) Lose rate vector regarding `loseMat`. 
 */
export function getLoseVec(loseMat: number[][], maxCall: number, currentNum: number, {vecModifier=defaultLoseRate, matRev=false}: StrategyOption = {}): number[] {
    const lookupMat = getLookupMat(loseMat, maxCall, currentNum, {matRev: matRev})
    const loseVec = lookupMat.map((loseMatRow) => vecModifier(loseMatRow)) 
    return loseVec
}

/**
 * 
 * @param numPlayer Number of players
 * @param maxCount Maximam number of numbers player can call on his turn.
 * @param numEnd Final number of the game.
 * @returns ((`numEnd` + 1) x (`numPlayer`)) lose probability matrix. 
 */
export function getFullLoseProbMat(numPlayer: number, maxCall: number, numEnd: number, {}: StrategyOption = {}): number[][] {
    const loseMat = [];
    const initial = getUnitVec(numPlayer);
    loseMat.push(initial);
    for (var currentNum=numEnd; currentNum>=0; currentNum--) {
        const loseVec = getLoseVec(loseMat, maxCall, currentNum, {vecModifier: defaultLoseRate, matRev: true});
        const chooseProb = getChooseProb(loseVec);
        const lookupMat = getLookupMat(loseMat, maxCall, currentNum, {matRev: true});
        const lookupMatShifted = matShiftToLast(lookupMat);
        const nextLoseVec = vecMatDot(chooseProb, lookupMatShifted);
        loseMat.push(nextLoseVec);
    }
    return loseMat;
}
