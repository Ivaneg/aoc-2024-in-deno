import { EOL } from "@std/fs/eol";

const input = await Deno.readTextFile("day-5/input.txt");

type rule = {
  page: string;
  rules: string[];
};

const rulesFile = input.split(EOL);
const readings: string[] = [];
const orderRule: string[] = [];

function compare(a: string, b: string) {
  return orderRule.findIndex((x) => x === a) -
    orderRule.findIndex((y) => y === b);
}

function getRules(rules: string[]) {
  const rulesList: rule[] = [];
  rules.forEach((page) => {
    if (page.includes("|")) {
      const p = page.split("|");
      const rule = rulesList.find((ele) => ele.page === p[0]);
      if (rule != null) {
        rule.rules.push(p[1]);
      } else {
        const r: rule = {
          page: p[0],
          rules: [p[1]],
        };
        rulesList.push(r);
      }
    } else {
      if (page != "") {
        readings.push(page);
      }
    }
  });
  rulesList.forEach((r) => {
    if (r.rules.length === 1) {
      orderRule[rulesList.length] = r.rules[0];
    }
    orderRule[rulesList.length - r.rules.length] = r.page;
  });
}

function day5WithSort() {
  let middleSum = 0;
  getRules(rulesFile);
  readings.forEach((read) => {
    const reads = read.split(",");
    const sortedReads = reads.toSorted(compare);
    const val = sortedReads.reduce(
      (prev, current, idx) => prev && current === reads[idx],
      true,
    );
    if (val) {
      const mid = Math.floor(reads.length / 2);
      middleSum += parseInt(reads[mid]);
    }
  });
  console.log("Total: ", middleSum);
}

day5WithSort();
