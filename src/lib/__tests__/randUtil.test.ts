import { getRandomInt, getRandomIntAsVec } from "../randUtil"

describe("getRandomInt", () => {
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(0, 1);
            expect(value).toEqual(0);
        })
    })
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(0, 2);
            expect(value).toBeLessThan(2);
            expect(value).toBeGreaterThanOrEqual(0);
        })
    })
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(100, 101);
            expect(value).toEqual(100);
        })
    })
    it("", () => {
        Array.from(Array(100)).forEach((_) => {
            const value = getRandomInt(100, 102);
            expect(value).toBeLessThan(102);
            expect(value).toBeGreaterThanOrEqual(100);
        })
    })
    it("Mean value test - can fail occationally", () => {
        const sum = Array.from(Array(1000)).reduce((accum, cur) => accum + getRandomInt(0, 2), 0)/1000;
        expect(sum).toBeGreaterThan(0.4);
        expect(sum).toBeLessThan(0.6);
    })
})

describe("getRandomIntAsVec", () => {
    it("", () => {
        Array.from(Array(10)).forEach(() => expect(getRandomIntAsVec([1, 0])).toEqual(0));
    })
    it("", () => {
        Array.from(Array(10)).forEach(() => expect(getRandomIntAsVec([0, 1])).toEqual(1));
    })
    it("", () => {
        Array.from(Array(10)).forEach(() => expect(getRandomIntAsVec([0, 0, 1, 0])).toEqual(2));
    })
    it("Mean value test - can fail occationally", () => {
        const chooseVec = [0.5, 0.5]
        const sum = Array.from(Array(5000)).reduce((accum, _) => accum + getRandomIntAsVec(chooseVec), 0)/5000;
        expect(sum).toBeGreaterThan(0.4)
        expect(sum).toBeLessThan(0.6)
    })
})

export {}