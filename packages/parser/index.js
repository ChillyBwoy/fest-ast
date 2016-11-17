const fs = require('fs');
const htmlparser = require('htmlparser2');

const template = process.argv.slice(2)[0];
const tpl = fs.readFileSync(template, 'utf8');

const WHITESPACE = /[(\t\v\f \u00A0\uFEFF)|(\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000)]/g;
const CHARS = /[^<\n\r]+/g;

function isValidStr(str) {
  const match = CHARS.exec(str);
  return match === null;
}

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

function fiestaParser(html, options) {
  const buffer = new Buffer();
  const results = new Buffer();

  const parser = new htmlparser.Parser({
    onprocessinginstruction(name, data) {
      if (name.toLowerCase() === '!doctype') {
        results.push('<' + data + '>'); }
    },

    oncomment(data) {
      const comment = '<!--' + data + '-->';
      const last = buffer.last();

      if (!last) {
        results.push(comment);
        return;
      }

      if (!Array.isArray(last.children)) {
        last.children = [];
      }
      last.children.push(comment);
    },

    onopentag(tag, attrs) {
      const buf = {
        attrs,
        tag: tag.toLowerCase()
      };
      buffer.push(buf);
    },

    onclosetag() {
      const buf = buffer.pop();

      if (!buffer.length) {
        results.push(buf);
        return;
      }

      const last = buffer.last();

      if (!Array.isArray(last.children)) {
        last.children = [];
      }
      if (typeof buf === 'string') {
        if (isValidStr(buf)) {
          last.children.push(buf);
        }
      } else {
        last.children.push(buf);
      }
    },

    ontext(text) {
      const last = buffer.last();

      if (!last) {
        results.push(text);
        return;
      }

      if (!Array.isArray(last.children)) {
        last.children = [];
      }

      if (isValidStr(text)) {
        last.children.push(text);
      }
    }
  }, options);

  parser.write(html);
  parser.end();

  return results.flush();
}

const tree = fiestaParser(tpl);
console.log('==== output ====');
console.log(JSON.stringify(tree, null, 2));
