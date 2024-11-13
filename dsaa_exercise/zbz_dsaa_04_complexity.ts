import { testSearchAlgorithmEff } from "./tool";

function binarySeek(arr: number[], index: number): number {
  let resNum = -1;

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const curNum = Math.floor((left + right) / 2);
    if (arr[curNum] > index) {
      right = curNum - 1;
    } else if (arr[curNum] < index) {
      left = curNum + 1;
    } else if ((arr[curNum] = index)) {
      resNum = curNum;
      break;
    }
  }

  return resNum;
}

function travelSeek(arr: number[], index: number): number {
  let len = arr.length - 1;

  for (let i = 0; i <= len; i++) {
    if (arr[i] === index) {
      return arr[i]!;
    }
  }

  return -1;
}

const res = binarySeek([1, 5, 7, 44, 45, 47, 49, 156, 235], 5);

console.log(res);
testSearchAlgorithmEff(binarySeek);
testSearchAlgorithmEff(travelSeek);

export {};
