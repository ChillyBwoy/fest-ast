import { vdom } from 'cito';
import tplTodos from './templates/todos';
import tplTodosFest from './templates/todos.fest';
import tplToolkitFest from './templates/toolkit.fest';

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
  const $root3 = document.getElementById('root3');

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
  const tpl = tplTodos(render);

  const root1 = vdom.append($root1, tpl(state));
  const root2 = vdom.append($root2, tplTodosFest(state));
  const root3 = vdom.append($root3, tplToolkitFest(state));

  // setInterval(() => {
  //   state = {
  //     ...state,
  //     todos: [{text: Math.random().toString()}, ...state.todos]
  //   };
  //   vdom.update(root1, tpl(state));
  //   vdom.update(root2, tplTodosFest(state));
  // }, 3000);
});
