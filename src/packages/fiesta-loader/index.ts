const { fiesta } = require('@mrgm/fiesta-core');

export default function fiestaLoaderCreatror(...plugins) {
  return function fiestaLoader(source) {
    const compile = fiesta(...plugins);
    return compile(source).transform().stringify();
  };
};
