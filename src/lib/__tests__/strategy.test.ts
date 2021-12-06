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

describe("getFullLoseProbVec", () => {
    it("", () => {
        expect(getFullLoseProbMat(2, 2, 1)).toEqual([[1, 0], [0, 1]])
    })
    
})

export {}