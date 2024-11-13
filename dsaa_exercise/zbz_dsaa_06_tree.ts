import { btPrint } from "hy-algokit";

export class TreeNode<T> {
  left: TreeNode<T> | null = null;

  right: TreeNode<T> | null = null;

  parent: TreeNode<T> | null = null;

  get isLeft(): boolean {
    return !!(this.parent?.left && this.parent?.left == this);
  }

  constructor(public value: T) {}
}

export class BinarySearchTree<T> {
  protected root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  protected insertNode(newNode: TreeNode<T>, frontNode: TreeNode<T>): void {
    if (frontNode?.value >= newNode.value) {
      if (!frontNode.left) {
        frontNode.left = newNode;
        newNode.parent = frontNode;
      } else {
        this.insertNode(newNode, frontNode.left);
      }
    } else if (frontNode?.value < newNode.value) {
      if (!frontNode.right) {
        frontNode.right = newNode;
        newNode.parent = frontNode;
      } else {
        this.insertNode(newNode, frontNode.right);
      }
    }
  }

  private preOrder(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  private preOrderMer() {
    const stake: TreeNode<T>[] = [];
    let curNode = this.root;

    while (stake.length !== 0 || curNode) {
      while (curNode) {
        console.log(curNode.value);
        stake.push(curNode);
        curNode = curNode.left;
      }
      curNode = stake.pop()!;

      curNode = curNode.right;
    }
  }

  private preOrderIf() {
    const stake: TreeNode<T>[] = [];
    let curNode: null | TreeNode<T> = this.root;

    while (stake.length !== 0 || curNode) {
      if (curNode) {
        console.log(curNode.value);
        stake.push(curNode);
        curNode = curNode.left;
      } else {
        curNode = stake.pop()!;
        curNode = curNode?.right;
      }
    }
  }

  private inOrder(node: TreeNode<T> | null) {
    if (node) {
      this.inOrder(node.left);
      console.log(node.value);
      this.inOrder(node.right);
    }
  }

  private inOrderMer() {
    const stake: TreeNode<T>[] = [];
    let curNode = this.root;

    while (stake.length !== 0 || curNode) {
      while (curNode) {
        stake.push(curNode);
        curNode = curNode.left;
      }
      curNode = stake.pop()!;
      console.log(curNode.value);

      curNode = curNode.right;
    }
  }

  private postOrder(node: TreeNode<T> | null) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.value);
    }
  }

  private postOrderMer() {
    const stake: TreeNode<T>[] = [];
    let curNode = this.root;
    let lastVisitNode = null;

    while (stake.length !== 0 || curNode) {
      while (curNode) {
        stake.push(curNode);
        curNode = curNode.left;
      }

      curNode = stake[stake.length - 1];

      if (!curNode.right || curNode.right === lastVisitNode) {
        console.log(curNode.value);
        lastVisitNode = curNode;
        stake.pop();
        curNode = null;
      } else {
        curNode = curNode.right;
      }
    }
  }

  protected createNode(value: T): TreeNode<T> {
    return new TreeNode<T>(value);
  }

  protected checkBalance(curNode: TreeNode<T>, isAdd: boolean) {}

  insert(value: T) {
    const newNode = this.createNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    this.insertNode(newNode, this.root);

    this.checkBalance(newNode, true);
    /* AVL树的模板方法 */
  }

  preOrderTraverse() {
    /* this.preOrder(this.root); */
    /* this.preOrderMer(); */
    this.preOrderIf();
  }

  inOrderTraverse() {
    /* this.inOrder(this.root); */
    this.inOrderMer();
  }

  postOrderTraverse() {
    /* this.postOrder(this.root); */
    this.postOrderMer();
  }

  levelOrderTraverse() {
    if (!this.root) return;

    const treeQueue: TreeNode<T>[] = [];

    treeQueue.push(this.root);

    while (treeQueue.length) {
      const curNode = treeQueue.shift()!;
      console.log(curNode.value);

      if (curNode.left) treeQueue.push(curNode.left);
      if (curNode.right) treeQueue.push(curNode.right);
    }
  }

  getMaxValue(): T | null {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value ?? null;
  }

  getMinValue(): T | null {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value ?? null;
  }

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent;
    while (current) {
      if (current.value === value) return current;

      parent = current;
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.left;
      }
      if (current) current.parent = parent;
    }

    return null;
  }

  search(value: T): boolean {
    /*  return this.searchRecur(this.root, value); */

    const node = this.searchNode(value);

    return !!node;
  }

  private searchRecur(node: TreeNode<T> | null, value: T): boolean {
    if (!node) return false;
    if (node.value < value) {
      return this.searchRecur(node.right, value);
    } else if (node.value > value) {
      return this.searchRecur(node.left, value);
    } else {
      return true;
    }
  }

  private getSuccessor(node: TreeNode<T>): TreeNode<T> {
    let successor: TreeNode<T> | null = null;
    let curNode: TreeNode<T> | null = node.right;

    while (curNode) {
      successor = curNode;
      curNode = curNode.left;
      if (curNode) curNode.parent = successor;
      /* 循环将节点的左子节点parent指向后继 */
    }

    if (successor !== node.right) {
      successor!.parent!.left = successor!.right;
      if (successor!.right) successor!.right.parent = successor!.parent!;
      /* 更改后继的右子节点的parent指向后继原父节点 为了可以reBalance AVL树 */

      successor!.right = node.right;
      /* 后继节点右节点指向当前节点右节点 */

      node!.right!.parent = successor;
      /* 更改当前节点的右子节点的parent指向后继 为了可以reBalance AVL树 */
    }

    successor!.left = node.left;
    node.left!.parent = successor;
    /* 更改当前节点的左子节点的parent指向后继 为了可以reBalance AVL树 */

    return successor!;
  }

  remove(value: T): TreeNode<T> | null {
    let node = this.searchNode(value);
    let replaceNode: TreeNode<T> | null = null;

    if (!node) return null;

    if (!node.left && !node.right) replaceNode = null;
    if (!node.left || !node.right) replaceNode = node.left ?? node.right;
    if (node.left && node.right) replaceNode = this.getSuccessor(node);

    if (node === this.root) {
      this.root = replaceNode;
    } else {
      if (node.isLeft) {
        node.parent!.left = replaceNode;
      } else {
        node.parent!.right = replaceNode;
      }
    }

    /* 实现AVL树删除 理论最多需要操作五个节点的parent指向
    1.当前节点没有子节点；不需要操作parent
    2.当前节点有一个子节点；需要操作1个节点：当前节点子节点parent指向当前节点父节点
    3.当前节点有两个子节点，寻找后继替代：
      一.后继就是当前节点右节点；需要操作两个节点：
          Ⅰ后继节点parent指向当前节点父节点
          Ⅱ当前节点左节点parent指向后继
      二.后继没有子节点；需要操作三个节点：
          Ⅰ后继节点parent指向当前节点父节点
          Ⅱ当前节点左节点parent指向后继
          Ⅲ当前节点右节点parent指向后继
      三.后继有一个右节点；需要操作四个节点：
          Ⅰ后继节点parent指向当前节点父节点
          Ⅱ当前节点左节点parent指向后继
          Ⅲ当前节点右节点parent指向后继
          Ⅳ后继节点右节点parent指向后继原父节点
    最后因为后继不会有左节点，所以理论需操作的五个节点的parent分别是
        当前节点左 右节点parent、替换节点parent、替换节点左 右节点parent
        但因为替换节点要么只有一个子节点、要么只有右节点所以最多只有四个节点 */

    if (replaceNode && node.parent) replaceNode.parent = node.parent;
    /* 当被删除节点有一个子节点 或两个子节点，将替代节点的parent指向当前节点父节点
    为了可以reBalance AVL树 */

    if (node.parent) {
      this.checkBalance(node.parent, false);
    }

    /* AVL树的模板方法 */

    return node;
  }
}

const bst = new BinarySearchTree<number>();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

/* bst.print(); */

/* bst.postOrderTraverse(); */
/* bst.levelOrderTraverse(); */

/* console.log(bst.getMaxValue(), "max");
console.log(bst.getMinValue(), "min"); */

/* console.log(bst.search(25));
bst.remove(15);
console.log(bst.remove(11));
bst.remove(7);

bst.print(); */
