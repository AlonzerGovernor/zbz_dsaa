import { LinkedList, LinkedNode } from "./zbz_03_linkedList";

class CircularLinkedList<T> extends LinkedList<T> {
  appand(val: T): void {
    super.appand(val);

    this.tail!.next = this.head;
  }

  protected traverseList<List>(): List[] {
    const resNodeList = super.traverseList<LinkedNode<T>>();

    if (this.head) resNodeList.push(this.head);

    return resNodeList as List[];
  }

  insert(inVal: T, position: number): void {
    super.insert(inVal, position);

    if (position >= this.size || position <= 0) this.tail!.next = this.head;
  }

  removeAd(address: number): T | null {
    const resVal = super.removeAd(address);

    if (resVal && (!address || address >= this.size))
      this.tail!.next = this.head;

    return resVal;
  }
}

const circularList = new CircularLinkedList<string>();
