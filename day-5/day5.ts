import { EOL } from "@std/fs/eol";

const input = await Deno.readTextFile("day-5/input.txt");

type rule = {
  page: string;
  rules: string[];
};

const rulesFile = input.split(EOL);
const rulesList: rule[] = [];
const readings: string[] = [];

function getRules(rules: string[]) {
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
      rulesList.push({ page: r.rules[0], rules: [] });
    }
  });
}

function isCorrect(list: string[], rule: rule, idx: number) {
  for (let i = idx + 1; i < list.length; i++) {
    if (!rule.rules.includes(list[i])) {
      return false;
    }
  }
  return true;
}

function day5() {
  let middleSum = 0;
  getRules(rulesFile);
  readings.forEach((read) => {
    const reads = read.split(",");
    for (let i = 0; i < reads.length; i++) {
      const rule = rulesList.find((x) => x.page === reads[i]);
      if (rule != null) {
        const correct = isCorrect(reads, rule, i);
        if (!correct) {
          break;
        }
      }
      if (i === reads.length - 1) {
        const mid = Math.floor(reads.length / 2);
        middleSum += parseInt(reads[mid]);
      }
    }
  });
  console.log("Total: ", middleSum);
}

day5();
