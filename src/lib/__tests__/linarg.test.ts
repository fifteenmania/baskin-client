import { vecFindMin, vecShiftToLast } from "../linarg"

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
})

export {}