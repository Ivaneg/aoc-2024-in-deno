import { EOL } from "@std/fs/eol";

const input = await Deno.readTextFile("day-7/input.txt");
const equations = input.split(EOL);
const result: string[] = [];
const values: string[][] = [];

equations.forEach((eq) => {
  const val = eq.split(":");
  if (val[0] !== "") {
    result.push(val[0]);
    values.push(val[1].trim().split(" "));
  }
});
function r(
  total: number,
  list: string[],
  idx: number,
  result: number,
): boolean {
  if (idx === list.length) {
    if (total === result) {
      return true;
    }
    return false;
  }
  const sum = r(total + Number(list[idx]), list, idx + 1, result);
  total = total === 0 ? 1 : total;
  const mul = r(total * Number(list[idx]), list, idx + 1, result);
  return sum || mul;
}

function day7() {
  let total = 0;
  for (let i = 0; i < result.length; i++) {
    if (r(0, values[i], 0, Number(result[i]))) {
      total += Number(result[i]);
    }
  }
  console.log(total);
}

day7();
