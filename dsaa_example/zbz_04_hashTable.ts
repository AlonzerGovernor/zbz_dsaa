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

    if (!bucket) {
      bucket = [];
      this.storage[hashCode] = bucket;
    }

    const { tuple } = this.gethashTuple(key);

    if (tuple) {
      tuple[1] = value;
      isUpdate = true;
    }

    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;

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

const hashMap9 = new HashTable<string>();
