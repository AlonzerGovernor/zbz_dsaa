class ArrayStack<T = any> {
  private data: T[] = [];

  push(element: T): void {
    this.data.push(element);
  }

  pop(): T | undefined {
    return this.data.pop();
  }

  peek(): T | undefined {
    const topArrItem = this.data[this.size() - 1];
    return topArrItem;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.data.length;
  }
}

const stack = new ArrayStack<number>();
