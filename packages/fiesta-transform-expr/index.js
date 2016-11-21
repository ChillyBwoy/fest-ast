const wrapExpr = e => `('' + (${e}))`;
const wrapStr = s => `('${s}')`;

const cut = (s) => s.slice(1, -1);

function hasExpr(str) {
  const r = /\{[^\{\}\n\r]*?\}/iu;
  return r.exec(str) !== null;
}

function extractRecur(str, patterns = []) {
  if (str.length === 0) {
    return patterns;
  }
  const r = /\{[^\{\}\n\r]*?\}/iu;
  const match = r.exec(str);

  if (match === null) {
    return patterns.concat(wrapStr(str));
  }
  const p = match[0];
  const head = str.slice(0, match.index);
  const tail = str.slice(match.index + p.length);
  const next = patterns.concat(head.length ? [wrapStr(head), wrapExpr(cut(p))] : wrapExpr(cut(p)));

  return extractRecur(tail, next);
}

function extract(str) {
  return hasExpr(str) ? extractRecur(str).join('+') : str;
}

function extractObject(obj) {
  return Object.keys(obj).reduce((target, name) => {
    const value = obj[name];
    target[name] = extract(value);
    return target;
  }, {});
}

function plugin() {
  return {
    name: 'expr',
    transform(ast, { getNodeBy }) {
      return getNodeBy(node => {
        const { type, attrs, children } = node;
        return {
          type,
          attrs: extractObject(attrs),
          children: type === '#text' ? extract(children) : children
        };
      }, ast);
    }
  };
}

module.exports = plugin;
