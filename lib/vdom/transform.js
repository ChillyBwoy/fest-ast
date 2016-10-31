export function transform (type, attrs, children) {
  const [scope, name] = type.split(':');
  return {
    scope: name ? scope : null,
    type,
    attrs,
    children
  };
}
