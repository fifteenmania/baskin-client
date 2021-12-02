import { getChooseProb } from "../strategy"

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

export {}