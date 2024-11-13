import { TreeNode, BinarySearchTree } from "./zbz_05_binarySearchTree";

class AVLTreeNode<T> extends TreeNode<T> {
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;

  getHeight(): number {
    const leftHeight = this.left?.getHeight() ?? 0;
    const rightHeight = this.right?.getHeight() ?? 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  getBalanceFactor(): number {
    const leftHeight = this.left?.getHeight() ?? 0;
    const rightHeight = this.right?.getHeight() ?? 0;

    return leftHeight - rightHeight;
  }

  get isBalance(): boolean {
    const foctor = this.getBalanceFactor();

    return foctor >= -1 && foctor <= 1;
  }

  get highterChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left?.getHeight() ?? 0;
    const rightHeight = this.right?.getHeight() ?? 0;

    if (leftHeight < rightHeight) return this.right;
    if (leftHeight > rightHeight) return this.left;
    return this.isLeft ? this.left : this.right;
  }

  rightRotation() {
    const isLeft = this.isLeft;

    const pivot = this.left!;
    pivot.parent = this.parent;

    this.left = pivot.right;
    if (pivot.right) pivot.right.parent = this;

    this.parent = pivot;
    pivot.right = this;

    if (!pivot.parent) {
      return pivot;
    } else if (isLeft) {
      pivot.parent.left = pivot;
    } else if (!isLeft) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }

  leftRotation() {
    const isLeft = this.isLeft;

    const pivot = this.right!;
    pivot.parent = this.parent;

    this.right = pivot.left;
    if (pivot.left) pivot.left.parent = this;

    this.parent = pivot;
    pivot.left = this;

    if (!pivot.parent) {
      return pivot;
    } else if (!isLeft) {
      pivot.parent.right = pivot;
    } else if (isLeft) {
      pivot.parent.left = pivot;
    }

    return pivot;
  }
}

class AVLTree<T> extends BinarySearchTree<T> {
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode<T>(value);
  }

  checkBalance(curNode: AVLTreeNode<T>, isAdd: boolean) {
    if (!curNode.isBalance) {
      this.reBalance(curNode);
    } else if (curNode == this.root || !curNode) {
      return;
    }
    if (isAdd) return;
    this.checkBalance(curNode.parent!, isAdd);
  }

  reBalance(root: AVLTreeNode<T>) {
    const pivot = root.highterChild!;
    const current = pivot.highterChild!;

    let resNode: AVLTreeNode<T> | null = null;
    if (pivot.isLeft) {
      //L
      if (!current.isLeft) pivot?.leftRotation(); //LR
      resNode = root?.rightRotation();
    } else {
      //R
      if (current.isLeft) pivot?.rightRotation(); //RL
      resNode = root?.leftRotation(); //RR
    }

    if (!resNode.parent) this.root = resNode;
  }
}

const avl = new AVLTree<number>();
