function totalDistance(loc1: number[], loc2: number[]) {
  loc1.sort((a, b) => a - b);
  loc2.sort((a, b) => a - b);

  const size1 = loc1.length;
  const size2 = loc2.length;
  let total = 0;
  if (size1 <= size2) {
    for (let i = 0; i < size2; i++) {
      if (i < size1) {
        total += Math.abs(loc1[i] - loc2[i]);
      } else {
        total += loc2[i];
      }
    }
  } else {
    for (let i = 0; i < size1; i++) {
      if (i < size2) {
        total += Math.abs(loc1[i] - loc2[i]);
      } else {
        total += loc1[i];
      }
    }
  }
  return total;
}

function anotherDay1() {
  const locations1: number[] = [3, 4, 2, 1, 3, 3];
  const locations2: number[] = [4, 3, 5, 3, 9, 3];

  const total = totalDistance(locations1, locations2);
  console.log(total);
}

anotherDay1();
