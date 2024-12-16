import { EOL } from "@std/fs/eol";

type Region = {
  area: number;
  perimeter: number;
};

type Position = {
  row: number;
  col: number;
  //letter: string;
};

const input = await Deno.readTextFile("day-12/input.txt");
const rows = input.trim().split(EOL);
const map: string[][] = [];

rows.forEach((row, idx) => {
  map[idx] = row.split("");
});

function isLowerCase(s: string): boolean {
  return (/[a-z]/.test(s));
}

function areaAndPerimeter(map: string[][], pos: Position): Region {
  if (isLowerCase(map[pos.row][pos.col])) {
    return {
      area: 0,
      perimeter: 0,
    };
  }

  map[pos.row][pos.col] = map[pos.row][pos.col].toLowerCase();
  let vertex = 0;
  let count = 0;
  const letter = map[pos.row][pos.col];

  //top
  if (map[pos.row - 1] && map[pos.row - 1][pos.col]) {
    const top = map[pos.row - 1][pos.col];
    if (top.toLowerCase() !== letter) {
      vertex++;
    } else {
      const { area, perimeter } = areaAndPerimeter(map, {
        row: pos.row - 1,
        col: pos.col,
      });
      count += area;
      vertex += perimeter;
    }
  } else {
    vertex++;
  }

  //right
  if (map[pos.row][pos.col + 1]) {
    const right = map[pos.row][pos.col + 1];
    if (right.toLowerCase() !== letter) {
      vertex++;
    } else {
      const { area, perimeter } = areaAndPerimeter(map, {
        row: pos.row,
        col: pos.col + 1,
      });
      count += area;
      vertex += perimeter;
    }
  } else {
    vertex++;
  }

  //bot
  if (map[pos.row + 1] && map[pos.row + 1][pos.col]) {
    const bot = map[pos.row + 1][pos.col];
    if (bot.toLowerCase() != letter) {
      vertex++;
    } else {
      const { area, perimeter } = areaAndPerimeter(map, {
        row: pos.row + 1,
        col: pos.col,
      });
      count += area;
      vertex += perimeter;
    }
  } else {
    vertex++;
  }

  // left
  if (map[pos.row][pos.col - 1]) {
    const left = map[pos.row][pos.col - 1];
    if (left.toLowerCase() !== letter) {
      vertex++;
    } else {
      const { area, perimeter } = areaAndPerimeter(map, {
        row: pos.row,
        col: pos.col - 1,
      });
      count += area;
      vertex += perimeter;
    }
  } else {
    vertex++;
  }

  count++;
  return {
    area: count,
    perimeter: vertex,
  };
}

let price = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const { area, perimeter } = areaAndPerimeter(map, { row: i, col: j });
    if (area !== 0) {
      price += area * perimeter;
    }
  }
}

console.log(price);
