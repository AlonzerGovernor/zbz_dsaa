export class LinkedNode<T> {
  next: LinkedNode<T> | null = null;

  constructor(public val: T) {}
}

export class LinkedList<T> {
  protected head: LinkedNode<T> | null = null;
  protected tail: LinkedNode<T> | null = null;
  protected size: number = 0;

  protected traverseList<List>(): List[] {
    let headNode = this.head;
    let resNodeList = [];

    while (headNode) {
      resNodeList.push(headNode);
      if (this.isTail(headNode)) {
        headNode = null;
      } else {
        headNode = headNode?.next;
      }
    }
    return resNodeList as List[];
  }

  protected seekList<List>(add: number): List {
    let resNode = this.head;

    for (let i = 1; i <= add - 1; i++) {
      resNode = resNode!.next;
    }

    return resNode! as List;
  }

  private isTail(node: LinkedNode<T>): boolean {
    return this.tail == node;
  }

  get length(): number {
    return this.size;
  }

  appand(val: T): void {
    let currentNode = new LinkedNode<T>(val);
    if (!this.head) {
      this.head = currentNode;
    } else {
      this.tail!.next = currentNode;
    }
    this.tail = currentNode;
    this.size++;
  }

  traverse(): string {
    let resList = [];

    const nodeList = this.traverseList<LinkedNode<T>>();
    resList = nodeList.map((item) => item.val);

    return resList.join("->");
  }

  insert(inVal: T, position: number): void {
    const inNode = new LinkedNode<T>(inVal);
    if (position >= this.size) position = this.size;
    if (!this.head || position <= 0) {
      inNode.next = this.head;
      this.head = inNode;
    } else {
      let curNode = this.seekList<LinkedNode<T>>(position);

      inNode.next = curNode.next;
      curNode!.next = inNode;
    }
    if (position === this.size) this.tail = inNode;

    this.size++;
  }

  removeAd(address: number): T | null {
    let targetNode: LinkedNode<T>;

    if (address >= this.size) address = this.size;
    if (address < 0 || !this.size) return null;

    if (address === 0) {
      targetNode = this.head!;
      this.head = targetNode?.next ?? null;
      if (this.length === 1) this.tail = null;
    } else {
      let curNode = this.seekList<LinkedNode<T>>(address - 1);

      targetNode = curNode.next!;
      curNode.next = targetNode?.next;

      if (address === this.length) this.tail = curNode;
    }

    this.size--;

    return targetNode?.val;
  }

  removeVal(element: T): T | null {
    const address = this.indexOf(element);
    if (address) {
      return this.removeAd(address);
    } else {
      return null;
    }
  }

  getAd(address: number): LinkedNode<T> | null {
    let resNode: LinkedNode<T> | null;

    if (address >= this.size) address = this.size - 1;
    if (address < 0 || !this.size) return null;
    if (address === 0) {
      resNode = this.head!;
    } else {
      const frontNode = this.seekList<LinkedNode<T>>(address);
      resNode = frontNode.next;
    }

    return resNode;
  }

  updateAd(address: number, element: T): void {
    if (address > this.size) address = this.size;
    if (address < 0 || !this.size) return;
    if (address === 0) {
      this.head!.val = element;
    } else {
      const curNode = this.seekList<LinkedNode<T>>(address).next!;
      curNode.val = element;
    }
  }

  indexOf(element: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.val === element) {
        return index;
      }
      if (this.isTail(current)) {
        current = null;
      } else {
        current = current.next;
      }
      index++;
    }

    return -1;
  }

  isEmpty(): boolean {
    return !!this.size;
  }
}

const linkedList = new LinkedList<string>();
