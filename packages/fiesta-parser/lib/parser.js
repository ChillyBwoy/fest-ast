const sax = require('sax');

const { Buffer } = require('./buffer');
const { CHARS } = require('./constants');

const buffer = new Buffer();
const results = new Buffer();

function notEmptyString(str) {
  return CHARS.exec(str.trim()) === null;
}

function expr(type, attrs = {}, children = []) {
  return { type, attrs, children };
}

function parse(tpl) {
  const parser = sax.parser(true, {
    xmlns: true,
    lowercase: true
  });
  // parser.onerror = (e) => {};

  parser.oncomment = (content) => {
    const last = buffer.last();

    if (!last) {
      results.push(expr('#comment', {}, content));
      return;
    }

    if (!Array.isArray(last.children)) {
      last.children = [];
    }
    last.children.push(expr('#comment', {}, content));
  };

  parser.ontext = (text) => {
    const last = buffer.last();

    if (notEmptyString(text)) {
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
  };

  parser.onopentag = (node) => {
    // const { name, attributes, ns, prefix, local, uri, isSelfClosing } = node;
    const { name, attributes } = node;
    const attrs = Object.keys(attributes).reduce((acc, key) => {
      const attr = attributes[key];
      acc[attr.name] = attr.value;
      return acc;
    }, {});
    const newNode = expr(name, attrs);
    buffer.push(newNode);
  };

  parser.onclosetag = (/* name */) => {
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
  };

  // parser.onattribute = ({ name, value }) => {};
  // parser.onend = () => {};

  parser.write(tpl).close();
  return results.flush();
}

module.exports = parse;
