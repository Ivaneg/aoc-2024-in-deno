const input = await Deno.readTextFile("day-9/input.txt");
const diskMap = input.trim().split("").map(Number);
const compact: number[] = [];

function day9() {
  let i = 0;
  let diskMapSize = diskMap.length - 1;

  while (i <= diskMapSize) {
    const beginingID = i / 2;
    let lastID = Math.floor(diskMapSize / 2);
    let freeSpace = diskMap[i + 1];
    while (diskMap[i] > 0) {
      compact.push(beginingID);
      diskMap[i]--;
    }
    while (beginingID < lastID && freeSpace > 0) {
      lastID = Math.floor(diskMapSize / 2);
      if (diskMap[diskMapSize] > 0) {
        compact.push(lastID);
        diskMap[diskMapSize]--;
        freeSpace--;
      } else {
        diskMapSize = diskMapSize - 2;
        lastID = Math.floor(diskMapSize / 2);
      }
    }

    i = i + 2;
  }

  const checkSum = compact.reduce((acc, val, idx) => {
    return acc + val * idx;
  });
  console.log(checkSum);
}

day9();
