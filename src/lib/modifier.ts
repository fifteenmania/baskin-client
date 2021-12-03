
export type VecModifier = (loseMatRow: number[]) => number;

export function nextTurnLoseRate(loseMatRow: number[]): number {
    return loseMatRow[loseMatRow.length - 1];
}

export function targetKill(loseMatRow: number[], target: number): number {
    return loseMatRow[target];
}