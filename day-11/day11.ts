const input = await Deno.readTextFile("day-11/input.txt");
let puzzle = input.split(" ").map(Number);

function rules(rune: number, idx: number, arr: number[]): boolean {
  const digits = Math.floor(Math.log10(rune) + 1);
  const evenDigits = digits % 2 === 0;
  if (rune === 0) {
    arr[idx] = 1;
    return false;
  } else if (evenDigits) {
    const exp = digits / 2;
    const div = 10 ** exp;
    const runeLeft = Math.floor(rune / div);
    const runeRight = rune % div;
    arr[idx] = runeLeft;
    arr.splice(idx, 0, runeRight);
    return true;
  } else {
    arr[idx] = arr[idx] * 2024;
    return false;
  }
}
function day11() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      const addedNewRune = rules(puzzle[j], j, puzzle);
      if (addedNewRune) {
        j++;
      }
    }
  }

  console.log(puzzle.length, "Stones!");
}

day11();
