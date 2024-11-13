import { cbtPrint } from "hy-algokit";

export class Heap<T> {
  private data: T[] = [];
  private length: number = 0;

  constructor(data: T[] = [], private isMax: boolean = true) {
    if (data.length !== 0) this.buildHeap(data);
  }

  private swap(i: number, j: number) {
    let temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  private indexCompare(i1: number, i2: number) {
    return this.isMax
      ? this.data[i1] <= this.data[i2]
      : this.data[i1] >= this.data[i2];
  }

  private heapifyUp(curIndex: number): void {
    let parentIndex = Math.floor((curIndex - 1) / 2);

    if (curIndex <= 0 || this.indexCompare(curIndex, parentIndex)) return;
    this.swap(curIndex, parentIndex);

    this.heapifyUp(parentIndex);
  }

  private heapifyDown(curIndex: number): void {
    const leftNodeIndex = 2 * curIndex + 1;
    const rightNodeIndex = 2 * curIndex + 2;

    const nextIndex = this.indexCompare(leftNodeIndex, rightNodeIndex)
      ? rightNodeIndex
      : leftNodeIndex;
    /* 因为左子节点是必定存在的，但右子节点可能不存在；所以当表达式为false时赋给左节点 */

    if (this.indexCompare(nextIndex, curIndex) || leftNodeIndex >= this.length)
      return;
    this.swap(curIndex, nextIndex);

    this.heapifyDown(nextIndex);
  }

  insert(value: T): void {
    this.data.push(value);

    this.length++;

    if (!(this.length - 1)) return;

    this.heapifyUp(this.length - 1);
  }

  extract(): T | null {
    if (!this.length) return null;

    const resVal = this.data[0];
    this.length -= 1;

    if (this.data.length === 1) return this.data.pop()!;

    this.data[0] = this.data.pop()!;
    this.heapifyDown(0);

    return resVal;
  }

  buildHeap(arr: T[]): T[] {
    this.data = arr;
    this.length = arr.length;
    let firstIndex = Math.floor((this.length - 1) / 2);

    while (firstIndex + 1) {
      this.heapifyDown(firstIndex);
      firstIndex--;
    }

    return this.data;
  }

  peek(): T {
    return this.data[0];
  }

  get isEmpty(): boolean {
    return !!this.length;
  }

  get size(): number {
    return this.length;
  }

  print() {
    cbtPrint(this.data);
  }
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
const ar = [9, 11, 20, 56, 23, 45];

const heap = new Heap<number>(arr);

/* arr.forEach((item) => heap.insert(item)); */

/* console.log(heap.extract());
console.log(heap.extract()); */

/* const resArr = heap.buildHeap(arr); */

/* heap.print(); */