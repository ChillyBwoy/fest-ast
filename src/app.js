import { createVDOM } from '../lib/vdom';

import tplTodos from './templates/todos';

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  let state = {
    label: 'Initial state',
    todos: [
      { text: 'first' },
      { text: 'second' }
    ]
  };

  const vdom = createVDOM($root, tplTodos);
  vdom(state);

  setTimeout(() => {
    vdom({
      ...state,
      label: 'State updated',
      todos: [{text: 'brand new todo'}, ...state.todos]
    });
  }, 5000);
});
