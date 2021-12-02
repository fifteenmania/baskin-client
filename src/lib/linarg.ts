export function vecFindMin(vec: number[]) {
    return vec.reduce((lowest, current) => lowest > current ? current : lowest, Infinity);
}

export function vecShiftToLast(vec: number[]): number[] {
    if (vec.length <= 1) {
        return vec;
    }
    const copied = vec.slice(0, -1)
    copied.unshift(vec[vec.length - 1]);
    return copied
}

export function matShiftToLast(mat: number[][]): number[][] {
    return mat.map((row) => vecShiftToLast(row));
}

export function vecNormalize(vec: number[]): number[] {
    const sum = vec.reduce((accum, item) => accum + item, 0);
    return vec.map(x => x/sum);
}

export function matSliceCol(mat: number[][], colIdx: number): number[] {
    return mat.reduce((accum, row) => accum.concat(row[colIdx]), []);
}

// multiplication
// matrix should be in row-major order
export function vecVecDot(vec1: number[], vec2: number[]): number {
    return vec1.reduce((accum, value, idx) => accum + (value*vec2[idx]), 0);
}

export function vecMatDot(vec: number[], mat: number[][]): number[] {
    return mat.reduce((accumRow, arrRow, rowIdx) => accumRow.map((colVal, colIdx) => colVal+arrRow[colIdx]*vec[rowIdx]), new Array(mat[0].length).fill(0))
}