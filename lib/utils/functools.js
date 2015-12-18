export function multi (pred) {
  var methods = Map();

  var fn = function (...args) {
    var methodFn = methods.get(pred(...args));
		return methodFn ? methodFn(...args) : null;
  };

  fn.method = function (predKey, methodFn) {
    methods.set(predKey, methodFn);
    return this;
  };

  return fn;
}
