import { ArrayQueue } from "./zbz_02_queue";

class Deque<T> extends ArrayQueue<T> {
  addFront(item: T): void {
    this.data.unshift(item);
  }

  removeBack(): T | undefined {
    return this.data.pop();
  }
}

const deque = new Deque();
