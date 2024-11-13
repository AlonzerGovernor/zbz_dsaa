import { LinkedList, LinkedNode } from "./zbz_03_linkedList";

class DoublyNode<T> extends LinkedNode<T> {
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;
}

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null;

  appand(val: T): void {
    let curNode = new DoublyNode<T>(val);

    if (!this.head) {
      this.head = curNode;
    } else {
      this.tail!.next = curNode;
      curNode.prev = this.tail;
    }

    this.tail = curNode;
    this.size++;
  }

  prepend(val: T): void {
    let curNode = new DoublyNode<T>(val);

    if (!this.head) {
      this.head = curNode;
      this.tail = curNode;
    } else {
      curNode.next = this.head;
      this.head.prev = curNode;
      this.head = curNode;
    }

    this.size++;
  }

  postTrave(): string {
    let resStr = "";

    const nodeList = super.traverseList<DoublyNode<T>>().reverse();
    resStr = nodeList.map((item) => item.val).join("->");

    return resStr;
  }

  insert(inVal: T, position: number): void {
    const inNode = new DoublyNode(inVal);
    if (position > this.length || position < 0) return;
    if (position === 0) {
      this.prepend(inVal);
    } else if (position === this.length) {
      this.appand(inVal);
    } else {
      let curNode = this.seekList<DoublyNode<T>>(position);

      inNode!.next = curNode.next;
      inNode.prev = curNode;
      inNode!.next!.prev = inNode;
      curNode.next = inNode;

      this.size++;
    }
  }

  removeAd(address: number): T | null {
    let targetNode: DoublyNode<T>;

    if (address >= this.length || address < 0 || !this.size) return null;
    if (address == 0) {
      targetNode = this.head!;
      this.head = targetNode.next ?? null;
      if (this.length === 1) this.tail = null;
    } else if (address === this.length - 1) {
      targetNode = this.tail!;
      this.tail = targetNode.prev ?? null;
      if (this.length === 1) this.head = null;
    } else {
      let curNode = this.seekList<DoublyNode<T>>(address - 1);

      targetNode = curNode.next!;
      curNode.next = targetNode.next;
      targetNode.next!.prev = curNode;
    }
    this.size--;

    return targetNode.val ?? null;
  }
}

const doublyList = new DoublyLinkedList<string>();
