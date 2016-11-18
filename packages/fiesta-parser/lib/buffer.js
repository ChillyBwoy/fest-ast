class Buffer {
  constructor() {
    this._buffer = [];
  }

  get length() {
    return this._buffer.length;
  }

  last() {
    return this._buffer[this.length - 1];
  }

  pop() {
    return this._buffer.pop();
  }

  push(obj) {
    return this._buffer.push(obj);
  }

  flush() {
    return this._buffer.slice(0);
  }
}

module.exports = {
  Buffer
};
