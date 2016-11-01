import { vdom } from 'cito';
import tplTodosFest from './templates/todos.fest';

function render (type, node, attrs, params, children) {
  if (node.scope === 'fest') {
    return {
      children: Array.prototype.concat.apply([], children),
      attrs
    };
  } else if (node.scope === 'xml') {
    return {
      tag: node.name,
      attrs,
      children: Array.prototype.concat.apply([], children)
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const $root1 = document.getElementById('root1');
  const $root2 = document.getElementById('root2');

  let state = {
    newTodo: 'initial state',
    really: {
      first: 'make a coffee',
      second: 'code'
    },
    todos: [
      { text: 'first' },
      { text: 'second' }
    ]
  };

  const root2 = vdom.append($root2, tplTodosFest(state));


  setInterval(() => {
    state = {
      ...state,
      todos: [{text: Math.random().toString()}, ...state.todos]
    };
    vdom.update(root2, tplTodosFest(state));
  }, 3000);
});
