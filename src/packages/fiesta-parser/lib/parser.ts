import * as sax from "sax";

import Buffer from "./buffer";

export interface FiestaAttrs {
  [attr: string]: string;
}
export type FiestaNodeChild = FiestaNode | string;
export interface FiestaNode {
  type: string;
  attrs: FiestaAttrs;
  children: FiestaNodeChild | FiestaNodeChild[];
}

function isEmptyString(str: string): boolean {
  const r = /[^<\n\r]+/g;
  return r.exec(str.trim()) === null;
}

function expr(type: string, attrs: FiestaAttrs = {}, children:FiestaNodeChild[] = []): FiestaNode {
  return { type, attrs, children };
}

export function createParser() {
  const buffer = new Buffer<FiestaNode>();
  const results = new Buffer<FiestaNode>();

  const parser = sax.parser(true, {
    xmlns: true,
    lowercase: true
  });

  // parser.onerror = (e) => {};
  // parser.onattribute = ({ name, value }) => {};
  // parser.onend = () => {};

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
  };

  parser.onopentag = (node) => {
    // const { name, attributes, ns, prefix, local, uri, isSelfClosing } = node;

    const { name, attributes } = node;
    const attrNames = Object.keys(attributes);

    const attrs = Object.keys(attributes).reduce((acc, key) => {
      const attr = attributes[key];
      acc[attr.name] = attr.value;
      return acc;
    }, {});
    const newNode = expr(name, attrs);
    buffer.push(newNode);
  };

  parser.onclosetag = () => {
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

  return (tpl) => {
    parser.write(tpl).close();
    return expr('#root', {}, results.flush());
  };
}
