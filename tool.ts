const performance = require("perf_hooks").performance;

export function testSearchAlgorithmEff(fn: Function) {
  let arr = new Array(1000000).fill(0).map((_, i) => i);

  let target = 588987;

  let start = performance.now();
  fn(arr, target);
  let end = performance.now();

  console.log(`${end - start}`);
}
