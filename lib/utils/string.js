function stringify (ast) {
  return JSON.stringify(ast);
};

function createExprExtractor (wrapExpr, wrapStr) {
  const PATTERN = /\{[^\{\}\n\r]*?\}/iu;
  const cut = (s) => s.slice(1, -1);

  function extract (str, patterns = []) {
    if (str.length === 0) {
      return patterns;
    }
    let match = PATTERN.exec(str);

    if (match === null) {
      return patterns.concat(wrapStr(str));
    } else {
      let p = match[0];
      let head = str.slice(0, match.index);
      let tail = str.slice(match.index + p.length);
      let next = patterns.concat(head.length ? [wrapStr(head), wrapExpr(cut(p))] : wrapExpr(cut(p)));

      return extract(tail, next);
    }
  }

  return {
    inString: extract,
    inObject(obj) {
      const kv = Object.keys(obj).map(name => {
        let value = extract(obj[name]);
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
