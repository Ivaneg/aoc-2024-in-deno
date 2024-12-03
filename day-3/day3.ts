const memory = await Deno.readTextFile("day-3/memory.txt");

function scanMemoryForCorruption(): number {
  const regex = /(mul\(\d\d?\d?,\d\d?\d?\))/gm;

  const notCorrupted = memory.matchAll(regex);
  let suma = 0;
  notCorrupted.forEach((nc) => {
    const value = nc[0].replace("mul(", "").replace(")", "").split(",");
    suma += parseInt(value[0]) * parseInt(value[1]);
  });
  return suma;
}

console.log(scanMemoryForCorruption());
