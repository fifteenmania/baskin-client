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
/**
 * 
 * @param vec1 (1 x n) row vector
 * @param vec2 (n X 1) column vector
 * @returns (vec1 . vec2) = scalar
 */
export function vecVecDot(vec1: number[], vec2: number[]): number {
    return vec1.reduce((accum, value, idx) => accum + (value*vec2[idx]), 0);
}

/**
 * 
 * @param vec (1 x n) row vector.
 * @param mat (n x m) matrix. Should be in row-major order.
 * @returns (vec . mat) = (1 x m) row vector
 */
export function vecMatDot(vec: number[], mat: number[][]): number[] {
    return mat.reduce((accumRow, arrRow, rowIdx) => accumRow.map((colVal, colIdx) => colVal+arrRow[colIdx]*vec[rowIdx]), new Array(mat[0].length).fill(0))
}

/**
 * 
 * @param mat (n x m) matrix. Should be in row-major order.
 * @param vec (m x 1) column vector.
 * @returns (mat . vec) = (n x l) column vector
 */
export function matVecDot(mat: number[][], vec: number[]): number[] {
    return mat.map((vec2) => vecVecDot(vec2, vec));
}

// debug
export function matToString(mat: number[][]) {
    return "[" + mat.map((x) => x.join(", ")).join("] [") + "]"
}
