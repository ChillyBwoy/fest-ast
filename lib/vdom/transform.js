export function transform (type, attrs, children) {
  return {
    type,
    attrs,
    children: Array.prototype.concat.apply([], children)
  };
}
