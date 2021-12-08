import { nextTurnLoseRate } from "../modifier"

describe("nextTernLoseRate", () => {
    it("", () => {
        expect(nextTurnLoseRate([1, 2, 3])).toEqual(3);
    })
    it("", () => {
        expect(nextTurnLoseRate([3, 4 , 5, 6])).toEqual(6);
    })
})