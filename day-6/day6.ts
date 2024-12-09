import { EOL } from "@std/fs/eol";

const mapFile = await Deno.readTextFile("day-6/input.txt");
const mapRows = mapFile.split(EOL);
const map: string[][] = [[]];

mapRows.forEach((row, idx) => {
  map[idx] = row.split("");
});

type coordinates = {
  x: number;
  y: number;
};

function goTop(map: string[][], cord: coordinates, count: number): number {
  let i = cord.y;
  let j = cord.x;
  for (i; i >= 0; i--) {
    if (map[i][j] !== "X") {
      count++;
    }
    if (map[i - 1][j]) {
      if (map[i - 1][j] === "#") {
        const noMoreMoves = {
          continue: true,
          x: j,
          y: i,
        };
        map[i][j] = "X";
        return goRight(map, noMoreMoves, count);
      } else {
        map[i][j] = "X";
      }
    } else {
      map[i][j] = "X";
      return count;
    }
  }
}

function goRight(
  map: string[][],
  cord: coordinates,
  count: number,
): number {
  let i = cord.y;
  let j = cord.x;
  for (j; j < map[j].length; j++) {
    if (map[i][j] !== "X") {
      count++;
    }
    if (map[i][j + 1]) {
      if (map[i][j + 1] === "#") {
        const noMoreMoves = {
          continue: true,
          x: j,
          y: i,
        };
        map[i][j] = "X";
        return goDown(map, noMoreMoves, count);
      } else {
        map[i][j] = "X";
      }
    } else {
      map[i][j] = "X";
      return count;
    }
  }
}

function goDown(
  map: string[][],
  cord: coordinates,
  count: number,
): number {
  let i = cord.y;
  let j = cord.x;
  for (i; i < map[i].length; i++) {
    if (map[i][j] !== "X") {
      count++;
    }
    if (map[i + 1][j]) {
      if (map[i + 1][j] === "#") {
        const noMoreMoves = {
          continue: true,
          x: j,
          y: i,
        };
        map[i][j] = "X";
        return goLeft(map, noMoreMoves, count);
      } else {
        map[i][j] = "X";
      }
    } else {
      map[i][j] = "X";
      return count;
    }
  }
}

function goLeft(
  map: string[][],
  cord: coordinates,
  count: number,
): number {
  let i = cord.y;
  let j = cord.x;
  for (j; j >= 0; j--) {
    if (map[i][j] !== "X") {
      count++;
    }
    if (map[i][j - 1]) {
      if (map[i][j - 1] === "#") {
        const noMoreMoves = {
          continue: true,
          x: j,
          y: i,
        };
        map[i][j] = "X";
        return goTop(map, noMoreMoves, count);
      } else {
        map[i][j] = "X";
      }
    } else {
      map[i][j] = "X";
      return count;
    }
  }
}

function day6() {
  const cord: coordinates = {
    x: 0,
    y: 0,
  };
  let distinctPositions: number = 0;
  console.log("Before");
  print();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === "^") {
        cord.y = i;
        cord.x = j;
        distinctPositions = goTop(map, cord, distinctPositions);
        break;
      } else if (map[i][j] === ">") {
        cord.y = i;
        cord.x = j;
        distinctPositions = goRight(map, cord, distinctPositions);
        break;
      } else if (map[i][j] === "v") {
        cord.y = i;
        cord.x = j;
        distinctPositions = goDown(map, cord, distinctPositions);
        break;
      } else if (map[i][j] === "<") {
        cord.y = i;
        cord.x = j;
        distinctPositions = goLeft(map, cord, distinctPositions);
        break;
      }
    }
  }
  console.log("After");
  print();
  console.log("Distinct Positions: ", distinctPositions);
}

function print() {
  map.forEach((element) => {
    console.log(element.join(""));
  });
}

day6();
