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

  const node = createVDOM(tplTodos);

  console.log(node);

  // $root.appendChild(node);
});
