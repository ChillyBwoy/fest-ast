export function isNil(x): boolean {
  return x === null || typeof x === 'undefined';
}

export function notNil(x): boolean {
  return !isNil(x);
}

export function toStr(src): string {
  return JSON.stringify(src);
}

