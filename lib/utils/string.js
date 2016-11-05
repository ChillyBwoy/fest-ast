function stringify(ast) {
  return JSON.stringify(ast);
}

function createExprExtractor(wrapExpr, wrapStr) {
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

  return {
    fromString: extract,
    fromObject(obj) {
      const kv = Object.keys(obj).map(name => {
        const value = extract(obj[name]);
        return `"${name}": ${value.join('+')}`;
      });
      return `{${kv.join(',')}}`;
    }
  };
}

module.exports = {
  stringify,
  createExprExtractor
};
