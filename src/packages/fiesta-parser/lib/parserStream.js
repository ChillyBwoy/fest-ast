const { Readable } = require('stream');

const sax = require('sax');

const { Buffer } = require('./buffer');
const { CHARS } = require('./constants');

function isEmptyString(str) {
  const r = /[^<\n\r]+/g;
  return r.exec(str.trim()) === null;
}

function expr(type, attrs = {}, children = []) {
  return { type, attrs, children };
}

function createParser() {
  const buffer = new Buffer();
  const results = new Buffer();

  const stream = sax.createStream(true, {
    xmlns: true,
    lowercase: true
  });

  stream.on('error', err => {});

  stream.on('comment', content => {
    const last = buffer.last();

    if (!last) {
      results.push(expr('#comment', {}, content));
      return;
    }

    if (!Array.isArray(last.children)) {
      last.children = [];
    }
    last.children.push(expr('#comment', {}, content));
  });

  stream.on('text', text => {
    const last = buffer.last();
    if (isEmptyString(text)) {
      return;
    }

    if (!last) {
      results.push(expr('#text', {}, text));
      return;
    }

    if (!Array.isArray(last.children)) {
      last.children = [];
    }
    last.children.push(expr('#text', {}, text));
  });

  stream.on('opentag', node => {
    // const { name, attributes, ns, prefix, local, uri, isSelfClosing } = node;
    const { name, attributes } = node;
    const attrs = Object.keys(attributes).reduce((acc, key) => {
      const attr = attributes[key];
      acc[attr.name] = attr.value;
      return acc;
    }, {});
    const newNode = expr(name, attrs);
    buffer.push(newNode);
  });

  stream.on('closetag', name => {
    const buf = buffer.pop();

    if (!buffer.length) {
      results.push(buf);
      return;
    }

    const last = buffer.last();
    if (!Array.isArray(last.children)) {
      last.children = [];
    }

    last.children.push(buf);
  });

  stream.on('end', () => {
    return expr('#root', {}, results.flush());
  });

  return (tpl) => {
    const r = new Readable();
    // s._read = function noop() {};
    r.setEncoding('utf8');
    r.push(tpl);
    r.push(null);
    r.pipe(stream);
    return {};
    // console.log(s);
    // return expr('#root', {}, results.flush());
  };
}

module.exports = createParser;
