import { getUnitVec, vecCumSum, vecFindMin, vecMatDot, vecShiftToLast } from "../linarg"

describe('findMin', () => {
    it('[1, 2] => 1', () => {
        expect(vecFindMin([1, 2])).toEqual(1)
    })
    it('[6, 3, 7] => 3', () => {
        expect(vecFindMin([6, 3, 7])).toEqual(3)
    })
})

describe('vecShiftToLast', () => {
    it('[] => []', () => {
        expect(vecShiftToLast([])).toEqual([])
    })
    it('[1] => [1]', () => {
        expect(vecShiftToLast([1])).toEqual([1])
    })
    it('[1, 2] => [2, 1]', () => {
        expect(vecShiftToLast([1, 2])).toEqual([2, 1])
    })
    it('[1, 2, 3] => [3, 1, 2]', () => {
        expect(vecShiftToLast([1, 2, 3])).toEqual([3, 1, 2])
    })
    it('immutability', () => {
        const vec = [1, 2, 3, 4];
        const vecCpy = vec.slice();
        vecShiftToLast(vec);
        expect(vec).toEqual(vecCpy);
    })
})

describe('vecCumSum', () => {
    it("", () => {
        expect(vecCumSum([0, 1, 2, 3])).toEqual([0, 1, 3, 6])
    })
    it("", () => {
        expect(vecCumSum([1, 2, 3, 4])).toEqual([1, 3, 6, 10])
    })
    it("", () => {
        expect(vecCumSum([])).toEqual([])
    })
    it("", () => {
        expect(vecCumSum([3, -1 , -1])).toEqual([3, 2, 1])
    })
})


describe("vecMatDot", () => {
    it("[1, 0], [[1, 2, 3], [4, 5, 6]] => [1, 2, 3]", () => {
        expect(vecMatDot([1, 0], [[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3])
    })
})

describe("getUnitVec", () => {
    it("", () => {
        expect(getUnitVec(1)).toEqual([1])
    })
    it("", () => {
        expect(getUnitVec(2)).toEqual([1, 0])
    })
    it("", () => {
        expect(getUnitVec(3)).toEqual([1, 0, 0])
    })
})

export {}