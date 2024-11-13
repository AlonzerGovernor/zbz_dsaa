import { TreeNode, BinarySearchTree } from "./zbz_dsaa_06_tree";

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
    /* 获取不平衡时，该旋转左节点还是右节点 */
    const leftHeight = this.left?.getHeight() ?? 0;
    const rightHeight = this.right?.getHeight() ?? 0;

    if (leftHeight < rightHeight) return this.right;
    if (leftHeight > rightHeight) return this.left;
    return this.isLeft ? this.left : this.right;
    /* 当父节点为左节点时返回左节点，但一般左右节点相同高度不会进入判断
    但为了某些情况不报错，所以约定会这么返回 */
  }

  rightRotation() {
    /* 取出当前root节点是否是左节点 */
    const isLeft = this.isLeft;

    /* 处理pivot节点 */
    const pivot = this.left!;
    pivot.parent = this.parent;

    /* 处理pivot的右节点 */
    this.left = pivot.right;
    if (pivot.right) pivot.right.parent = this;

    /* 处理当前root节点 */
    this.parent = pivot;
    pivot.right = this;

    /* 处理root节点父节点 */
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
    /* 插入时通过旋转变换，子树平衡后高度不变；所以第一次平衡后就可以break
    删除时，子树高度可能变化；所以必须递归向上直到根节点为止 */
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
const insertList = [];

/* for (let i = 0; i <= 19; i++) {
  let p = Math.floor(Math.random() * 200);
  if (i % 2) {
    insertList.push(p);
  }
  avl.insert(p);
}

avl.print();

console.log(insertList);
for (let n of insertList) {
  avl.remove(n);
} */

avl.insert(50);
avl.insert(25);
avl.insert(100);
avl.insert(150);
avl.insert(12);

avl.remove(12);
avl.remove(25);

avl.print();
