import { EOL } from "@std/fs/eol";

const input = await Deno.readTextFile("day-10/input.txt");
const mapRow = input.split(EOL);
const map: string[][] = [];

mapRow.forEach((row, idx) => {
  map[idx] = row.split("");
});

type Coordinates = {
  row: number;
  col: number;
};

type visited = {
  zero: Coordinates;
  highest: Coordinates;
};

let visitedByTheSame: visited[] = [];

function moveInMap(
  map: string[][],
  coords: Coordinates,
  og: Coordinates,
): number {
  let trailheads = 0;
  const currentHeight = Number(map[coords.row][coords.col]);
  if (
    currentHeight === 9 &&
    !visitedByTheSame.find((x) =>
      x.highest.col === coords.col && x.zero.col === og.col &&
      x.highest.row === coords.row && x.zero.row === og.row
    )
  ) {
    const visited = {
      zero: og,
      highest: coords,
    };
    visitedByTheSame.push(visited);
    return 1;
  }
  if (map[coords.row - 1] && map[coords.row - 1][coords.col]) {
    const moveTop = Number(map[coords.row - 1][coords.col]);
    if (moveTop - currentHeight === 1) {
      const coord = {
        row: coords.row - 1,
        col: coords.col,
      };
      trailheads += moveInMap(map, coord, og);
    }
  }
  if (map[coords.row] && map[coords.row][coords.col + 1]) {
    const moveRight = Number(map[coords.row][coords.col + 1]);
    if (moveRight - currentHeight === 1) {
      const coord = {
        row: coords.row,
        col: coords.col + 1,
      };
      trailheads += moveInMap(map, coord, og);
    }
  }
  if (map[coords.row + 1] && map[coords.row + 1][coords.col]) {
    const moveDown = Number(map[coords.row + 1][coords.col]);
    if (moveDown - currentHeight === 1) {
      const coord = {
        row: coords.row + 1,
        col: coords.col,
      };
      trailheads += moveInMap(map, coord, og);
    }
  }
  if (map[coords.row] && map[coords.row][coords.col - 1]) {
    const moveLeft = Number(map[coords.row][coords.col - 1]);

    if (moveLeft - currentHeight === 1) {
      const coord = {
        row: coords.row,
        col: coords.col - 1,
      };
      trailheads += moveInMap(map, coord, og);
    }
  }

  return trailheads;
}

function day10() {
  let score = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (Number(map[i][j]) === 0) {
        score += moveInMap(map, { row: i, col: j }, {
          row: i,
          col: j,
        });
        visitedByTheSame = [];
      }
    }
  }
  console.log(score);
}
day10();
