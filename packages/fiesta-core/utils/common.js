function isNil(x) {
  return x === null || typeof x === 'undefined';
}

function notNil(x) {
  return !isNil(x);
}

function toStr(src) {
  return JSON.stringify(src);
}

module.exports = {
  isNil,
  notNil,
  toStr
};
