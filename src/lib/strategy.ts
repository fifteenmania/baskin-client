import { getUnitVec, matShiftToLast, sliceRev, vecFindMin, vecMatDot, vecNormalize, vecShiftToLast, vecVecDot } from "./linarg";
import { defaultLoseRate, nextTurnLoseRate, VecModifier } from "./modifier";


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

export function getLookupMat(loseMat: number[][], maxCall: number, currentNum: number) {
    const startRow = currentNum+1;
    const endRow = currentNum+maxCall+1;
    const lookupMat = loseMat.slice(startRow, endRow);
    return lookupMat;
}

export function getLookupMatRev(loseMat: number[][], maxCall: number, currentNum: number, numEnd: number) {
    const currentIdx = numEnd - currentNum;
    const endRow = Math.max(currentIdx, 0);
    const startRow = Math.max(currentIdx - maxCall, 0);
    const lookupMat = loseMat.slice(startRow, endRow);
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
export function getLoseVec(loseMat: number[][], maxCall: number, currentNum: number, {vecModifier=defaultLoseRate} = {}): number[] {
    const lookupMat = getLookupMat(loseMat, maxCall, currentNum)
    const loseVec = lookupMat.map((loseMatRow) => vecModifier(loseMatRow)) 
    return loseVec
}

export function getLoseVecRev(loseMat: number[][], maxCall: number, currentNum: number, numEnd: number, {vecModifier=defaultLoseRate} = {}):number[] {
    const lookupMat = getLookupMatRev(loseMat, maxCall, currentNum, numEnd);
    const loseVec = lookupMat.map((loseMatRow) => vecModifier(loseMatRow))
    return loseVec;
}

/**
 * 
 * @param numPlayer Number of players
 * @param maxCount Maximam number of numbers player can call on his turn.
 * @param numEnd Final number of the game.
 * @returns ((`numEnd` + 1) x (`numPlayer`)) lose probability matrix. 
 */
export function getFullLoseProbMat(numPlayer: number, maxCall: number, numEnd: number): number[][] {
    const loseMat = [];
    const initial = getUnitVec(numPlayer);
    loseMat.push(initial);
    for (var currentNum=numEnd-1; currentNum>=0; currentNum--) {
        const lookupMat = getLookupMatRev(loseMat, maxCall, currentNum, numEnd);
        
        const loseVec = lookupMat.map((lookupMatRow) => lookupMatRow[0]);
        const chooseProb = getChooseProb(loseVec);

        const lookupMatShifted = matShiftToLast(lookupMat);
        const nextLoseVec = vecMatDot(chooseProb, lookupMatShifted);
        loseMat.push(nextLoseVec);
    }
    return loseMat.reverse();
}
