import { getRandomIntAsVec } from "./randUtil";
import { getChooseProb, getLoseVec } from "./strategy";

export interface PlayLogEntry {
    player: number,
    lastCall: number
}

export type PlayLog = PlayLogEntry[]

/**
 * 
 * @param playLog Log of the game.
 * @param numPlayer number of players.
 * @returns Current player who need to call next number.
 */
export function getCurrentPlayer(playLog: PlayLog, numPlayer: number): number {
    if (playLog.length === 0) {
        return 0;
    }
    return (playLog[playLog.length - 1].player + 1)%numPlayer;
}

/**
 * 
 * @param playLog Log of the game.
 * @returns Recently called number.
 */
export function getCurrentNum(playLog: PlayLog): number {
    if (playLog.length === 0) {
        return 0;
    }
    return playLog[playLog.length - 1].lastCall;
}

export function makePlayLogEntry(newNum: number, numEnd: number, playerTurn: number): PlayLogEntry {
    if (newNum >= numEnd) {
        return {player: playerTurn, lastCall: numEnd}
    } else {
        return {player: playerTurn, lastCall: newNum}
    }
}

export function handleAiTurnOnce(loseMat: number[][], playLog: PlayLog, maxCall: number, numEnd: number, aiTurn: number): PlayLogEntry {
    const currentNum = getCurrentNum(playLog);
    const loseVec = getLoseVec(loseMat, maxCall, currentNum);
    const chooseProb = getChooseProb(loseVec);
    const numChoose = getRandomIntAsVec(chooseProb);
    const newNum = numChoose + currentNum;
    return makePlayLogEntry(newNum, numEnd, aiTurn);
}

/**
 * 
 * @param playLog current game play log
 * @param numChoose human chose to call numbers up to `numChoose`
 * @param numEnd last number of game
 * @param playerTurn human player turn
 * @returns updated playlog after human play. Doesn't mutate original playLog.
 */
export function handlePlayerTurn(playLog: PlayLog, numChoose: number, numEnd: number, playerTurn: number): PlayLog {
    const playLogCopy = playLog.slice();
    const currentNum = getCurrentNum(playLog);
    const newNum = numChoose + currentNum;
    const newEntry = makePlayLogEntry(newNum, numEnd, playerTurn);
    playLogCopy.push(newEntry);
    return playLogCopy;
}

/**
 * 
 * @param loseMat lose rate matrix for all game states
 * @param playLog current game play log
 * @param maxCall maximum number of numbers
 * @param numEnd last number of game
 * @param playerTurn human player turn
 * @returns updated playlog after ai play. Doesn't mutate original `playLog`
 */
export function handleAiTurns(loseMat: number[][], playLog: PlayLog, maxCall: number, numEnd: number, playerTurn: number): PlayLog {
    const playLogCopy = playLog.slice();
    while (true) {
        const currentNum = getCurrentNum(playLogCopy);
        if (currentNum >= numEnd) {
            return playLogCopy;
        }
        const numPlayer = loseMat[0].length;
        const currentPlayer = getCurrentPlayer(playLogCopy, numPlayer);
        if (currentPlayer == playerTurn) {
            return playLogCopy;
        }
        const newEntry = handleAiTurnOnce(loseMat, playLogCopy, maxCall, numEnd, currentPlayer);
        playLogCopy.push(newEntry);
    }
}
