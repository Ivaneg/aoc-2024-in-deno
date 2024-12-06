import { EOL } from "@std/fs/eol";
const example = await Deno.readTextFile("day-4/example.txt");
const rowsFile = example.split(EOL);
let total: number = 0;
let i: number;

function day4(rows: string[]) {
  rows.forEach((row, idx) => {
    for (i = 0; i < row.length; i++) {
      if (row[i] === "X" || row[i] === "S") {
        total += searchHorizontally(rows, idx, i) ? 1 : 0;
        total += searchDiagonally(rows, idx, i) ? 1 : 0;
        total += searchVertically(rows, idx, i) ? 1 : 0;
      }
    }
  });

  console.log(total);
}

function searchHorizontally(
  matrix: string[],
  row: number,
  column: number,
): boolean {
  if (matrix[row][column] === "X") {
    return matrix[row][column + 1] === "M" && matrix[row][column + 2] === "A" &&
      matrix[row][column + 3] === "S";
  }
  if (matrix[row][column] === "S") {
    return matrix[row][column + 1] === "A" && matrix[row][column + 2] === "M" &&
      matrix[row][column + 3] === "X";
  }
  return false;
}

function searchDiagonally(
  matrix: string[],
  row: number,
  column: number,
): boolean {
  if (matrix[row][column] === "X") {
    const firstDiagonal = matrix[row + 1][column + 1] === "M" &&
      matrix[row + 2][column + 2] === "A" &&
      matrix[row + 3][column + 3] === "S";

    let secondDiagonal: boolean = false;
    if (row > 2 && column > 2) {
      secondDiagonal = matrix[row - 1][column - 1] === "M" &&
        matrix[row - 2][column - 2] === "A" &&
        matrix[row - 3][column - 3] === "S";
    }

    return firstDiagonal || secondDiagonal;
  }
  if (matrix[row][column] === "S") {
    const reverseFirstDiagonal = matrix[row + 1][column + 1] === "A" &&
      matrix[row + 2][column + 2] === "M" &&
      matrix[row + 3][column + 3] === "X";

    let reverseSecondDiagonal: boolean = false;
    if (row > 2 && column > 2) {
      reverseSecondDiagonal = matrix[row - 1][column - 1] === "A" &&
        matrix[row - 2][column - 2] === "M" &&
        matrix[row - 3][column - 3] === "X";
    }
    return reverseFirstDiagonal || reverseSecondDiagonal;
  }
  return false;
}

function searchVertically(
  matrix: string[],
  row: number,
  column: number,
): boolean {
  if (matrix[row][column] === "X") {
    return matrix[row + 1][column] === "M" && matrix[row + 2][column] === "A" &&
      matrix[row + 3][column] === "S";
  }
  if (matrix[row][column] === "S") {
    return matrix[row + 1][column] === "A" && matrix[row + 2][column] === "M" &&
      matrix[row + 3][column] === "X";
  }
  return false;
}

day4(rowsFile);
