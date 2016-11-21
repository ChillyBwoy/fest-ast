const wrapExpr = e => `('' + (${e}))`;
const wrapStr = s => `('${s}')`;

const cut = (s) => s.slice(1, -1);

function hasExpr(str) {
  const r = /\{[^\{\}\n\r]*?\}/iu;
  return r.exec(str) !== null;
}

function extract(str, patterns = []) {
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

  return extract(tail, next);
}

function extractObject(obj) {
  return Object.keys(obj).reduce((target, name) => {
    const value = obj[name];
    target[name] = hasExpr(value) ? extract(value).join('+') : value;
    return target;
  }, {});
}

function plugin() {
  return {
    name: 'expr',
    transform({ traverse }) {
      return traverse(node => {
        const { type, attrs, children } = node;
        return {
          type,
          attrs: extractObject(attrs),
          children
        };
      });
    }
  };
}

module.exports = plugin;
