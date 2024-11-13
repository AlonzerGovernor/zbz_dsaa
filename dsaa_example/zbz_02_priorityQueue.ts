import { Heap } from "./zbz_06_heap";

class PriorityNode<T> {
  constructor(public value: T, public priority: number) {}

  valueOf() {
    return this.priority;
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

const pQueue = new PriorityQueue<string>();
