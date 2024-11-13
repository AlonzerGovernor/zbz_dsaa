import { Heap } from "./zbz_dsaa_08_heap";

interface IList<T> {
  peek(): T | undefined;
  size(): number;
  isEmpty(): boolean;
}

interface IQueue<T> extends IList<T> {
  enqueue(item: T | T[]): void;
  dequeue(): T | undefined;
}

class PriorityNode<T> {
  constructor(public value: T, public priority: number) {}

  valueOf() {
    return this.priority;
  }
}

class ArrayQueue<T> implements IQueue<T> {
  protected data: T[] = [];

  enqueue(item: T | T[]): void {
    const arrItem = Array.isArray(item) ? item : [item];
    this.data.push(...arrItem);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return !this.data.length;
  }
}

function circleFlower<T>(item: T[], ind: number): T {
  const firstQueue = new ArrayQueue<T>();

  firstQueue.enqueue(item);

  let counter = 0;
  while (firstQueue.size() > 1) {
    counter += 1;
    if (counter < ind) {
      firstQueue.enqueue(firstQueue.dequeue()!);
    } else {
      firstQueue.dequeue();
      counter = 0;
    }
  }

  const res = firstQueue.dequeue()!;
  const index = item.indexOf(res);
  return res;
}

class Deque<T> extends ArrayQueue<T> {
  addFront(item: T): void {
    this.data.unshift(item);
  }

  removeBack(): T | undefined {
    return this.data.pop();
  }
}

class PriorityQueue<T> {
  data: Heap<PriorityNode<T>> = new Heap();

  enqueue(value: T, priority: number) {
    const curNode = new PriorityNode<T>(value, priority);
    this.data.insert(curNode);
  }

  dequeue(): T | undefined {
    const resNode = this.data.extract();

    return resNode?.value;
  }

  peek(): T | undefined {
    return this.data.peek().value;
  }

  isEmpty(): boolean {
    return this.data.isEmpty;
  }

  size(): number {
    return this.data.size;
  }
}

const queue = new ArrayQueue<string>();
const pQueue = new PriorityQueue<string>();

queue.enqueue(["boxing", "kickboxing", "jujistu", "judo"]);
[
  ["boxing", 3],
  ["kickboxing", 94],
  ["jujistu", 78],
  ["judo", 45],
  ["muay tai", 99],
  ["wrestling", 2],
  ["grapling", 55],
  ["karate", 21],
].forEach((item) => pQueue.enqueue(item[0] as string, item[1] as number));

const res = circleFlower<string>(
  [
    "boxing",
    "kickboxing",
    "jujistu",
    "judo",
    "muay tai",
    "wrestling",
    "grapling",
  ],
  3
);
/* console.log(res); */

pQueue.data.print();
console.log(pQueue.dequeue());
console.log(pQueue.dequeue());
console.log(pQueue.dequeue());
