import { getChooseProb, getFullLoseProbMat, getLoseVec } from "../strategy"

describe("getChooseProb", () => {
    it("[1] => [1]", () => {
        expect(getChooseProb([1])).toEqual([1])
    })
    it("[0] => [1]", () => {
        expect(getChooseProb([0])).toEqual([1])
    })
    it("[1, 0] => [0, 1]", () => {
        expect(getChooseProb([1, 0])).toEqual([0, 1])
    })
    it("[1, 0, 0] => [0, 1/2, 1/2]", () => {
        expect(getChooseProb([1, 0, 0])).toEqual([0, 1/2, 1/2])
    })
    it("[1, 0, 0, 0] => [0, 1/3, 1/3, 1/3]", () => {
        expect(getChooseProb([1, 0, 0, 0])).toEqual([0, 1/3, 1/3, 1/3])
    })
})

describe("getLoseVec", () => {
    it("", () => {
        expect(getLoseVec([[1], [0]], 1, 0)).toEqual([0])
    })
    it("", () => {
        expect(getLoseVec([[1, 0], [1, 0]], 1, 0)).toEqual([1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1]], 2, 0)).toEqual([0, 1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1], [1]], 2, 0)).toEqual([0, 1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1], [1]], 3, 0)).toEqual([0, 1, 1])
    })
    it("", () => {
        expect(getLoseVec([[1], [0], [1], [1]], 4, 0)).toEqual([0, 1, 1])
    })
    it("", () => {
        expect(getLoseVec([[1, 0], [0, 1], [0.5, 0.5], [0, 1], [1, 0]], 2, 1)).toEqual([0.5, 0])
    })
})

describe("getFullLoseProbMat", () => {
    function getMessage(numPlayer: number, maxCount: number, numEnd: number) {
        return `numPlayer: ${numPlayer}, maxCount: ${maxCount}, numEnd: ${numEnd}`
    }
    it(getMessage(2, 3, 4), () => {
        expect(getFullLoseProbMat(2, 3, 4)).toEqual([[1, 0], [0, 1], [1, 0], [1, 0], [1, 0]].reverse())
    })
    it(getMessage(2, 2, 4), () => {
        expect(getFullLoseProbMat(2, 2, 4)).toEqual([[1, 0], [0, 1], [1, 0], [1, 0], [0, 1]].reverse())
    })
    it(getMessage(2, 2, 6), () => {
        expect(getFullLoseProbMat(2, 2, 6)).toEqual([[1, 0], [0, 1], [1, 0], [1, 0], [0, 1], [1, 0], [1, 0]].reverse())
    })
    it(getMessage(3, 2, 3), () => {
        expect(getFullLoseProbMat(3, 2, 3)).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1], [1/2, 0, 1/2]].reverse())
    })
    it(getMessage(3, 3, 4), () => {
        expect(getFullLoseProbMat(3, 3, 4)).toEqual([[1, 0, 0], [0, 1, 0], [0, 0, 1], [1/2, 0, 1/2], [1/2, 0, 1/2]].reverse())
    })
})

export {}