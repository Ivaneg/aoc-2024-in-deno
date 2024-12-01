function merge(ogList: number[], left: number, mid: number, right: number) {
  const size1 = mid - left + 1;
  const size2 = right - mid;

  const leftList = new Array(size1);
  const rightList = new Array(size2);

  for (let i = 0; i < size1; i++) {
    leftList[i] = ogList[left + i];
  }
  for (let j = 0; j < size2; j++) {
    rightList[j] = ogList[mid + 1 + j];
  }

  let i: number = 0;
  let j: number = 0;
  let k: number = left;

  while (i < size1 && j < size2) {
    if (leftList[i] <= rightList[j]) {
      ogList[k] = leftList[i];
      i++;
    } else {
      ogList[k] = rightList[j];
      j++;
    }
    k++;
  }

  while (i < size1) {
    ogList[k] = leftList[i];
    i++;
    k++;
  }

  while (j < size2) {
    ogList[k] = rightList[j];
    j++;
    k++;
  }
}

function mergeSort(ogList: number[], left: number, right: number) {
  if (left >= right) {
    return;
  }

  const mid = Math.floor(left + (right - left) / 2);
  mergeSort(ogList, left, mid);
  mergeSort(ogList, mid + 1, right);
  merge(ogList, left, mid, right);
}

function totalDistance(loc1: number[], loc2: number[]) {
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

export function day1() {
  const locations1: number[] = [3, 4, 2, 1, 3, 3];
  const locations2: number[] = [4, 3, 5, 3, 9, 3];

  mergeSort(locations1, 0, locations1.length - 1);
  mergeSort(locations2, 0, locations2.length - 1);
  const total = totalDistance(locations1, locations2);
  console.log(total);
}
