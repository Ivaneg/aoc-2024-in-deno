import { EOL } from "@std/fs/eol";

const input = await Deno.readTextFile("day-8/input.txt");
const rows = input.split(EOL);
const map: string[][] = [];
const checked: string[] = [];

type Coordinates = {
  col: number;
  row: number;
};

rows.forEach((row, idx) => {
  map[idx] = row.split("");
});

function findInMatrix(
  key: string,
  list: string[][],
  coordinate: Coordinates,
): Coordinates[] {
  const coord: Coordinates[] = [];
  for (let i = coordinate.row; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if (key === list[i][j]) {
        const newCord: Coordinates = {
          col: j,
          row: i,
        };
        coord.push(newCord);
      }
    }
  }
  return coord;
}

function putAntinodes(map: string[][], coords: Coordinates[]): number {
  let count = 0;
  if (coords.length > 1) {
    for (let i = 0; i < coords.length; i++) {
      for (let j = 1; j < coords.length; j++) {
        const rowDiff = coords[j].row - coords[i].row;
        const colDiff = coords[j].col - coords[i].col;
        const rowL = coords[i].row - rowDiff;
        const colL = coords[i].col - colDiff;
        const rowR = coords[j].row + rowDiff;
        const colR = coords[j].col + colDiff;

        if (
          map[rowL] && map[rowL][colL] &&
          map[rowL][colL] !== map[coords[i].row][coords[i].col] &&
          map[rowL][colL] !== "#"
        ) {
          count++;
          if (map[rowL][colL] === ".") {
            map[rowL][colL] = "#";
          }
        }
        if (
          map[rowR] && map[rowR][colR] &&
          map[rowR][colR] !== map[coords[i].row][coords[i].col] &&
          map[rowR][colR] !== "#"
        ) {
          count++;
          if (map[rowR][colR] === ".") {
            map[rowR][colR] = "#";
          }
        }
      }
    }
  }
  return count;
}

function print() {
  map.forEach((element) => {
    console.log(element.join(""));
  });
}

function day8() {
  let totalAntinodes = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const alreadyChecked = checked.includes(map[i][j]);
      if (
        map[i][j] !== "." && map[i][j] !== "#" && !alreadyChecked
      ) {
        checked.push(map[i][j]);

        const coords = findInMatrix(map[i][j], map, { col: j, row: i });
        totalAntinodes += putAntinodes(map, coords);
      }
    }
  }
  print();
  console.log(totalAntinodes);
}

day8();
