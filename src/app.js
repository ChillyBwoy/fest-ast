import { createVDOM } from '../lib/vdom';

import tplTodos from './templates/todos';

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  let state = {
    newTodo: 'initial state',
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
      todos: [{text: 'brand new todo'}, ...state.todos]
    });
  }, 3000);
});
