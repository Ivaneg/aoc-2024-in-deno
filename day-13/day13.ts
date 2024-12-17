import { EOL } from "@std/fs/eol";

type Problems = {
  x: number[];
  y: number[];
};

type Problem = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  r1: number;
  r2: number;
};

type Result = {
  buttonA: number;
  buttonB: number;
};
const inputs = await Deno.readTextFile("day-13/input.txt");

function getProblem(inputs: string): Problems {
  const input = inputs.split(`${EOL}${EOL}`);
  const problems: string[][] = [];

  input.forEach((element, idx) => {
    problems[idx] = element.trim().split(EOL);
  });
  const a: number[] = [];
  const b: number[] = [];
  for (let i = 0; i < problems.length; i++) {
    for (let j = 0; j < problems[i].length; j++) {
      const problem = problems[i][j].split(EOL);
      const ab = problem[0].split(":")[1].split(",");
      const aValue = Number(ab[0].replace("X", "").replace("=", ""));
      a.push(aValue);
      const bValue = Number(ab[1].replace("Y", "").replace("=", ""));
      b.push(bValue);
    }
  }
  return {
    x: a,
    y: b,
  };
}

function calculate(p: Problem): Result {
  let buttonA = 0;
  let buttonB = 0;

  buttonB = (p.r2 * p.x1 - p.x2 * p.r1) / (p.y2 * p.x1 - p.y1 * p.x2);
  buttonA = (p.r2 - buttonB * p.y2) / p.x2;

  return {
    buttonA,
    buttonB,
  };
}
function day13() {
  let tokens = 0;
  const { x, y } = getProblem(inputs);
  for (let i = 0; i < x.length; i++) {
    const p: Problem = {
      x1: x[i],
      y1: x[i + 1],
      r1: x[i + 2],
      x2: y[i],
      y2: y[i + 1],
      r2: y[i + 2],
    };

    const { buttonA, buttonB } = calculate(p);
    if (Number.isInteger(buttonA) && Number.isInteger(buttonB)) {
      tokens += buttonA * 3 + buttonB;
    }
    i = i + 2;
  }
  console.log("Tokens needed: ", tokens);
}

day13();
