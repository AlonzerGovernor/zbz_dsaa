export class ArrayQueue<T> {
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

const queue = new ArrayQueue<string>();

queue.enqueue(["boxing", "kickboxing", "jujistu", "judo"]);
