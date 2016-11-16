function createCounter(token, prefix = '') {
  let count = 0;
  return function getVar(name) {
    count += 1;
    return `${prefix}$${token}$${(name ? name : count)}`;
  };
}

function createStorage() {
  const store = {};
  return {
    addItem(name, item) {
      store[name] = item;
    },
    getItem(name) {
      return store[name];
    },
    getAll() {
      const kv = Object.keys(store).map(name => {
        const value = store[name];
        return `"${name}": ${value}`;
      });
      return `{${kv.join(',')}}`;
    }
  };
}

module.exports = {
  createCounter,
  createStorage
};
