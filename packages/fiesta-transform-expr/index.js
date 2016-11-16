const wrapExpr = e => `("" + (${e}))`;
const wrapStr = s => `"${s}"`;

const PATTERN = /\{[^\{\}\n\r]*?\}/iu;
const cut = (s) => s.slice(1, -1);

function extract(str, patterns = []) {
  if (str.length === 0) {
    return patterns;
  }
  const match = PATTERN.exec(str);

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
  const kv = Object.keys(obj).map(name => {
    const value = extract(obj[name]);
    if (value.length) {
      return `"${name}": ${value.join('+')}`;
    }
    return `"${name}": ""`;
  });
  return `{${kv.join(',')}}`;
}

function plugin() {
  return {
    getProlog() {
      return '';
    },
    getNode(ast) {
      if (ast === null || typeof ast === 'undefined') {
        return ast;
      }
      if (typeof ast === 'string') {
        return ast;
      }

      const { attrs } = ast;

      return Object.assign({}, ast, {
        attrs: extractObject(attrs)
      });
    },
    name: 'expr'
  };
}

module.exports = plugin;
