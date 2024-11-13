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
  }

  preOrderTraverse() {
    this.preOrderIf();
  }

  inOrderTraverse() {
    this.inOrder(this.root);
  }

  postOrderTraverse() {
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
    const node = this.searchNode(value);

    return !!node;
  }

  private getSuccessor(node: TreeNode<T>): TreeNode<T> {
    let successor: TreeNode<T> | null = null;
    let curNode: TreeNode<T> | null = node.right;

    while (curNode) {
      successor = curNode;
      curNode = curNode.left;
      if (curNode) curNode.parent = successor;
    }

    if (successor !== node.right) {
      successor!.parent!.left = successor!.right;
      if (successor!.right) successor!.right.parent = successor!.parent!;

      successor!.right = node.right;

      node!.right!.parent = successor;
    }

    successor!.left = node.left;
    node.left!.parent = successor;

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

    if (replaceNode && node.parent) replaceNode.parent = node.parent;

    if (node.parent) {
      this.checkBalance(node.parent, false);
    }

    return node;
  }
}

const bst = new BinarySearchTree<number>();
