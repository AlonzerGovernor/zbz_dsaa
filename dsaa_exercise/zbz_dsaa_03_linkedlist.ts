/* 链表节点 */
class LinkedNode<T> {
  next: LinkedNode<T> | null = null;

  constructor(public val: T) {}
}

/* 双向链表节点 */
class DoublyNode<T> extends LinkedNode<T> {
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;
}

/* 单向链表 */
class LinkedList<T> {
  protected head: LinkedNode<T> | null = null;
  protected tail: LinkedNode<T> | null = null;
  protected size: number = 0;

  /* 返回链表节点的数组 */
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

  /* 返回所需位置的上一个节点的元素 add最大值是链表长度 */
  protected seekList<List>(add: number): List {
    let resNode = this.head;

    for (let i = 1; i <= add - 1; i++) {
      resNode = resNode!.next;
    }

    /* 因为传入的最大值是链表长度 所以返回的最后一个值也是链表最后一个值，不会为null */
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

  /* 根据位置删除元素 */
  removeAd(address: number): T | null {
    let targetNode: LinkedNode<T>;

    if (address >= this.size) address = this.size;
    if (address < 0 || !this.size) return null;
    /* 不需要判断this.head是否为空 为空this.size为0，不会进入下面的判断 */

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

/* 反转链表-以迭代的方法实现 */
function reverseLinkedList<T>(head: LinkedNode<T>): LinkedNode<T> | null {
  /* 实质 从前往后 将前一个节点赋值给当前节点的next */
  if (!head.next || !head) return head;

  let frontNode: LinkedNode<T> | null = null;

  while (head) {
    const nextNode = head.next;
    /* 记录下一个节点 以完成循环 */
    head.next = frontNode;
    /* 将当前节点的next指向前节点 */
    frontNode = head;
    /* 保存当前节点 为下一循环的前节点 */
    if (!nextNode) break;
    head = nextNode;
  }

  return head;
}

/* 反转链表-以递归的方法实现 */
function reverseLinkedBack<T>(head: LinkedNode<T>): LinkedNode<T> | null {
  /* 实质 从后往前 将下一个节点的next指向当前节点 */
  if (!head.next || !head) return head;

  let newHead = reverseLinkedBack(head.next);
  /* 获取后一个节点 */
  head.next.next = head;
  /* 将下一个节点的next指向当前节点 */
  head.next = null;
  /* 将当前节点的next指向null 为的是让头节点next指向null */
  return newHead;
  /* 将最后一个节点一直返回出去 */
}

/* 循环链表 */
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

/* 双向链表 */
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

const linkedList = new LinkedList<string>();
const circularList = new CircularLinkedList<string>();
const doublyList = new DoublyLinkedList<string>();

linkedList.appand("judo");
linkedList.appand("jujistu");
linkedList.appand("boxing");
linkedList.appand("kick boxing");
linkedList.appand("wrestling");
linkedList.appand("grapling");

linkedList.insert("karate", -4);

/* console.log(linkedList.removeAd(0)); */

linkedList.updateAd(0, "mma");

linkedList.removeVal("boxingsdf");

/* console.log(linkedList.traverse()); */
/* console.log(linkedList.getAd(0));
console.log(linkedList.indexOf("judo")); */

let resList = reverseLinkedBack(linkedList.getAd(0)!);
let resList2 = reverseLinkedBack(linkedList.getAd(0)!);

/* while (resList) {
  console.log(resList?.val);
  resList = resList.next;
} */

circularList.appand("111");
circularList.appand("222");
circularList.appand("333");
circularList.appand("444");
circularList.appand("555");

circularList.insert("aaa", 0);
/* console.log(circularList.removeAd(110)); */

/* console.log(circularList.getAd(55));
console.log(circularList.indexOf("aaa")); */

/* console.log(circularList.traverse()); */

doublyList.appand("aaa");
doublyList.appand("bbb");
doublyList.appand("ccc");
doublyList.appand("ddd");
doublyList.appand("eee");
doublyList.appand("fff");
doublyList.appand("ggg");

doublyList.prepend("444");

doublyList.insert("222", 8);

doublyList.removeAd(78);

console.log(doublyList.traverse());
/* console.log(doublyList.postTrave()); */

export {};
