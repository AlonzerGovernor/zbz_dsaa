/* 用数组实现栈结构 */
interface IStack<T> {
  push(element: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}

class ArrayStack<T = any> implements IStack<T> {
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
/* console.log(stack.push(33));
console.log(stack.push(34325));
console.log(stack.push(3233));
console.log(stack.push(234533));
console.log(stack.push(76978033));
console.log(stack.push(456433));

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());

console.log(stack.peek()); */

/* 十进制转二进制函数 */
/* function octToBin(tar: number): string {
  let res = "";
  let resStack = new ArrayStack<number>();

  function reduceTwo(target: number) {
    const bin = target % 2;
    //取余
    const rest = Math.floor(target / 2);
    //整除

    resStack.push(bin);
    if (rest !== 0) {
      reduceTwo(rest);
    } else {
      while (!resStack.isEmpty()) {
        res = `${res}${resStack.pop()}`;
      }
    }
  }

  reduceTwo(tar);

  return res;
}

const Bin = octToBin(901); */
/* console.log(Bin);
console.log(1110000101); */

/* 面试题 */
function judgeSign(front: string, back: string): boolean {
  let res = false;

  switch (front) {
    case "{":
      res = back === "}";
      break;
    case "(":
      res = back === ")";
      break;
    case "[":
      res = back === "]";
      break;
  }

  return res;
}

function regOverSign(target: string): boolean {
  let res = true;
  let resStack = new ArrayStack<string>();

  for (let i = 0; i <= target.length - 1; i++) {
    if (["{", "[", "("].indexOf(target[i]) !== -1) {
      resStack.push(target[i]);
    } else {
      const outStr = resStack.pop();
      res = outStr ? judgeSign(outStr, target[i]) : false;
      if (!res) return res;
    }
  }
  return resStack.isEmpty();
}

const res = regOverSign("({[[]]})[]{}{}");
console.log(res);

export default IStack;
