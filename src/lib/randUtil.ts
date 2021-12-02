export function getRandom(min: number, max: number): number {
    return Math.random()*(max-min) + min;
}

export function getRandomInt(min: number, max: number): number {
    return Math.floor(getRandom(Math.ceil(min), Math.floor(max)));
}

export function randomSampleOne(vec: number[]): number {
    const pickedIdx = getRandomInt(0, vec.length);
    return vec[pickedIdx];
}