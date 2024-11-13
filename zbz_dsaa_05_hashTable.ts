const REMOVEMARK = "-1";

function isPrime(num: number): boolean {
  const sqrt = Math.floor(Math.sqrt(num)) + 1;
  for (let i = 2; i <= sqrt; i++) {
    if (num % i == 0) return false;
  }
  return true;
}

class HashTable<T = any> {
  private storage: [string, T][][] = [];
  private length: number = 7;
  private count: number = 0;

  private hashFunC(key: string, max: number): number {
    let hashCode = 0;

    const len = key.length - 1;

    for (let i = 0; i <= len; i++) {
      hashCode = hashCode * 31 + key.charCodeAt(i);
    }

    const index = hashCode % max;

    return index;
  }

  private gethashTuple(key: string): {
    tuple: [string, T] | undefined;
    index: number | undefined;
  } {
    const hashCode = this.hashFunC(key, this.length);
    const bucket = this.storage[hashCode];

    let resTuple;

    bucket.forEach((item, index) => {
      const tupleKey = item[0];

      if (tupleKey === key) resTuple = { tuple: item, index };
    });

    return resTuple ?? { tuple: undefined, index: undefined };
  }

  private resizeHashTable(newLen: number): void {
    const oldStorage = this.storage;
    this.length = newLen;

    this.storage = [];
    this.count = 0;

    oldStorage.forEach((i) => i?.forEach((item) => this.put(...item)));
    console.log(newLen, this.count / this.length);
  }

  private nextPrime(num: number): number {
    while (!isPrime(num)) {
      num++;
    }
    if (num < 7) num = 7;
    return num;
  }

  put(key: string, value: T): void {
    const hashCode = this.hashFunC(key, this.length);
    let bucket = this.storage[hashCode];

    let isUpdate = false;

    /* 判断此处哈希值对应数组是否初始化 */
    if (!bucket) {
      bucket = [];
      this.storage[hashCode] = bucket;
    }

    /* 取出哈希值对应的元组 */
    const { tuple } = this.gethashTuple(key);

    if (tuple) {
      tuple[1] = value;
      isUpdate = true;
    }

    /* 判断是否是更新操作 若不是更新将次元素添进元组、count+1 */
    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;
      /* 判断是否需要扩容 */

      if (4 * this.count > 3 * this.length) {
        const newLength = this.nextPrime(this.length * 2);
        this.resizeHashTable(newLength);
      }
    }
  }

  get(key: string): T | undefined {
    const hashCode = this.hashFunC(key, this.length);
    const bucket = this.storage[hashCode];
    if (!bucket) return undefined;

    const { tuple } = this.gethashTuple(key);
    if (tuple) return tuple[1];

    return undefined;
  }

  delete(key: string): T | undefined {
    const hashCode = this.hashFunC(key, this.length);
    const bucket = this.storage[hashCode];
    if (!bucket) return undefined;

    const { tuple, index } = this.gethashTuple(key);

    if (tuple && index !== undefined) {
      bucket.splice(index, 1);
      this.count--;

      if (4 * this.count < this.length && this.length !== 7) {
        const newLength = this.nextPrime(Math.floor(this.length / 2));
        this.resizeHashTable(newLength);
      }
      return tuple[1];
    }

    return undefined;
  }
}

class HashOpenAddressTable<T = any> {
  storage: [string, T][] = [];
  private length: number = 7;
  private count: number = 0;

  private hashFunC(key: string, max: number): number {
    let hashCode = 0;

    const len = key.length - 1;

    for (let i = 0; i <= len; i++) {
      hashCode = hashCode * 31 + key.charCodeAt(i);
    }

    const index = hashCode % max;

    return index;
  }

  private nextPrime(num: number): number {
    while (!isPrime(num)) {
      num++;
    }
    if (num < 7) num = 7;
    return num;
  }

  private reHashFunC(key: string): number {
    /* 获取比数组长度小的第一个素数 */
    let frontPrime = this.length - 1;
    while (!isPrime(frontPrime)) {
      frontPrime--;
    }

    /* 获取未取模前的key的hashCode */
    let hashCode = 0;
    const len = key.length - 1;

    for (let i = 0; i <= len; i++) {
      hashCode = hashCode * 31 + key.charCodeAt(i);
    }

    /* 通过新的hash函数获取的步长 */
    const stepSize = frontPrime - (hashCode % frontPrime);
    return stepSize;
  }

  private resizeHashTable(newLen: number): void {
    const oldStorage = this.storage;
    this.length = newLen;

    this.storage = [];
    this.count = 0;

    oldStorage.forEach((i) => {
      if (i[0] != REMOVEMARK) this.put(...(i as [string, T]));
    });
  }

  private gethashTuple(key: string): {
    tuple: [string, T] | undefined;
    index: number;
  } {
    let hashCode = this.hashFunC(key, this.length);
    let tuple = this.storage[hashCode];

    let resTuple;
    if (!tuple) {
      return { tuple: undefined, index: hashCode };
    } else {
      if (tuple[0] == REMOVEMARK) return { tuple: undefined, index: hashCode };
    }

    const tupleKey = tuple[0];

    if (tupleKey === key) {
      resTuple = { tuple, index: hashCode };
    } else {
      const step = this.reHashFunC(key);
      let index = hashCode;
      while (tuple) {
        if (tuple[0] == REMOVEMARK) return { tuple, index };
        index += step;
        index = index >= this.length ? index - this.length : index;
        tuple = this.storage[index];
      }
      resTuple = { tuple, index };
    }

    return resTuple;
  }

  put(key: string, value: T): void {
    if (this.count === this.length) return;

    let isUpdate = false;

    const { tuple, index } = this.gethashTuple(key);
    if (tuple) {
      tuple[1] = value;
      isUpdate = true;
    }

    if (!isUpdate) {
      this.count++;
      this.storage[index!] = [key, value];
      if (4 * this.count > 3 * this.length) {
        const newLength = this.nextPrime(this.length * 2);
        this.resizeHashTable(newLength);
      }
    }
  }

  get(key: string): T | undefined {
    const { tuple } = this.gethashTuple(key);
    if (tuple) {
      if (tuple[0] === REMOVEMARK) return undefined;
      return tuple[1];
    }

    return undefined;
  }

  delete(key: string): T | undefined {
    const { tuple, index } = this.gethashTuple(key);

    if (tuple && index !== undefined) {
      this.storage[index] = [REMOVEMARK, tuple[1]];
      this.count--;

      if (4 * this.count < this.length && this.length !== 7) {
        const newLength = this.nextPrime(Math.floor(this.length / 2));
        this.resizeHashTable(newLength);
      }

      return tuple[1];
    }
    return undefined;
  }
}

const hashMap9 = new HashTable<string>();
const hashMap = new HashOpenAddressTable<string>();

hashMap.put("aaa", "judo");
hashMap.put("bbb", "jujitsu");
hashMap.put("ccc", "boxing");
hashMap.put("ddd", "kickboxing");
hashMap.put("eee", "wrestling");
hashMap.put("fff", "muai tai");
hashMap.put("ggg", "grapling");
hashMap.put("hhh", "karate");
hashMap.put("iii", "mma");

console.log(hashMap.delete("aaa"));
console.log(hashMap.delete("bbb"));
console.log(hashMap.delete("ccc"));
console.log(hashMap.delete("ddd"));

console.log(hashMap.delete("eee"));

console.log(hashMap.delete("fff"));
console.log(hashMap.delete("ggg"));
console.log(hashMap.delete("hhh"));

hashMap.put("aaa", "judo");
hashMap.put("bbb", "jujitsu");
hashMap.put("ccc", "boxing");
hashMap.put("ddd", "kickboxing");
hashMap.put("eee", "wrestling");
hashMap.put("fff", "muai tai");
hashMap.put("ggg", "grapling");

for (let i = 0; i <= 10; i++) {
  const code = String.fromCharCode(97 + i);
  console.log(hashMap.get(`${code}${code}${code}`));
}

console.log(hashMap);
