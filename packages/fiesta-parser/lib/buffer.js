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
    if (obj !== null && typeof obj !== 'undefined') {
      this._buffer.push(obj);
    }
    return this;
  }

  flush() {
    const result = this._buffer.slice(0);
    this._buffer = [];
    return result;
  }
}

module.exports = {
  Buffer
};
