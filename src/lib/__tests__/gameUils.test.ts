import { getCurrentPlayer, getCurrentNum, makePlayLogEntry, handleAiTurnOnce, handlePlayerTurn, handleAiTurns, PlayLog, PlayLogEntry } from "../gameUtil";
import { getRandomInt } from "../randUtil";
import { getFullLoseProbMat } from "../strategy";

const staticTestPlayLog : PlayLog = [
    {player: 0, lastCall: 1}, 
    {player: 1, lastCall: 2},
    {player: 2, lastCall: 3},
    {player: 0, lastCall: 5},
    {player: 1, lastCall: 30},
]

/**
 * 
 * @param numPlayer number of players
 * @param maxCall maximum number of numbers can call in one turn
 * @param numTurns number of turns played so far
 * @returns random PlayLog in condition.
 */
function makeRandomTestPlayLog(numPlayer: number, maxCall: number, numTurns: number) : PlayLog {
    const ret : PlayLog = [{player: 1, lastCall: getRandomInt(1, maxCall)}];
    for(let i = 1; i < numTurns; i++) {
        ret.push({player: i%numPlayer + 1, lastCall: ret[i-1].lastCall + getRandomInt(1, maxCall)});
    }
    return ret;
}

describe('getCurrentPlayer', () => {
    it('(staticTestPlayLog, 3) => 1', () => {
        const testPlayLog = staticTestPlayLog;
        console.log(testPlayLog);
        expect(getCurrentPlayer(testPlayLog, 3)).toEqual(1);
    })
    it('(makeRandomTestPlayLog(3, 3, 6), 3) => 1', () => {
        const testPlayLog = makeRandomTestPlayLog(3, 3, 6);
        console.log(testPlayLog);
        expect(getCurrentPlayer(testPlayLog, 3)).toEqual(1);
    })
    it('(makeRandomTestPlayLog(4, 4, 1), 4) => 2', () => {
        const testPlayLog = makeRandomTestPlayLog(4, 4, 1);
        console.log(testPlayLog);
        expect(getCurrentPlayer(testPlayLog, 4)).toEqual(2);
    })
    
})

describe('getCurrentNum', () => {
    it('staticTestPlayLog', () => {
        const testPlayLog = staticTestPlayLog;
        expect(getCurrentNum(testPlayLog)).toEqual(9);
    })
    it('(makeRandomTestPlayLog(4, 4, 1))', () => {
        const testPlayLog = makeRandomTestPlayLog(4, 4, 1);
        console.log(testPlayLog);
        expect(getCurrentNum(testPlayLog)).toEqual(testPlayLog[testPlayLog.length - 1].lastCall);
    })
})

describe('handlePlayerTurn', () => {
    it('(staticTestPlayLog, 3, 31, 1) => newPlayLog', () => {
        const testPlayLog = staticTestPlayLog;
        const answer = staticTestPlayLog.concat({player: 1, lastCall: 9+3});
        expect(handlePlayerTurn(testPlayLog, 3, 31, 1)).toEqual(answer);
    })
    it('(makeRandomTestPlayLog(4, 4, 1), 3, 31, 1) => newPlayLog', () => {
        const testPlayLog = makeRandomTestPlayLog(4, 4, 1);
        const answer = testPlayLog.concat({player: 1, lastCall: testPlayLog[testPlayLog.length - 1].lastCall + 3});
        expect(handlePlayerTurn(testPlayLog, 3, 31, 1)).toEqual(answer);
    })
})

describe('handleAiTurns', () => {
    it('(getFullLoseProbMat(2, 3, 31), makeRandomTestPlayLog(2, 3, 1), 3, 31, 1) => newPlayLog', () => {
        const testLoseMat = getFullLoseProbMat(2, 3, 31);
        const testPlayLog = makeRandomTestPlayLog(2, 3, 1);
        console.log(testPlayLog);
        const answer : PlayLog = [];
        expect(handleAiTurns(testLoseMat, testPlayLog, 3, 31, 1)).toEqual(answer);
    })
    it('(getFullLoseProbMat(3, 3, 31), makeRandomTestPlayLog(2, 3, 1), 3, 31, 1) => newPlayLog', () => {
        const testLoseMat = getFullLoseProbMat(3, 3, 31);
        const testPlayLog = staticTestPlayLog;
        console.log(testPlayLog);
        const answer : PlayLog = testPlayLog.concat({player: 2, lastCall: 31});
        expect(handleAiTurns(testLoseMat, testPlayLog, 3, 31, 0)).toEqual(answer);
    })
})