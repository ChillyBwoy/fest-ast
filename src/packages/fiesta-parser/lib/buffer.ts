export default class Buffer<T> {
  private buffer: T[];

  constructor() {
    this.buffer = [];
  }

  get length(): number {
    return this.buffer.length;
  }

  last(): T {
    return this.buffer[this.length - 1];
  }

  pop(): T {
    return this.buffer.pop();
  }

  push(obj: T): this {
    if (obj !== null && typeof obj !== "undefined") {
      this.buffer.push(obj);
    }
    return this;
  }

  flush(): T[] {
    const result = this.buffer.slice(0);
    this.buffer = [];
    return result;
  }
}
