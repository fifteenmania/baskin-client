import { vecFindMin, vecNormalize } from "./linarg";

export function getChooseProb(loseProb: number[], {absTol=10e-5}: {target?: number, absTol?: number} = {} ): number[] {
    const lowest = vecFindMin(loseProb);
    const check = loseProb.map((x) => Math.abs(x - lowest) < absTol ? 1: 0);
    const result = vecNormalize(check);
    return result;
}

export function getLoseProbMat(numPlayer: number, maxCount: number, numEnd: number): number[][] {
    return [[]];
}

