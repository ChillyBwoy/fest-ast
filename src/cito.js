import { vdom } from 'cito';
import tplTodos from './templates/todos';

function render (type, attrs, children) {
  return {
    tag: type,
    children: Array.prototype.concat.apply([], children),
    attrs
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');

  let state = {
    label: 'Initial state',
    newTodo: '',
    todos: []
  };

  const tpl = (data) => {
    let x = tplTodos(render);
    console.log(x(data));
    return {
      children: x(data)
    };
  };

  const v = vdom.append($root, tpl(state));
  let idcount = 0;
  // setInterval(() => {
  //   state = {
  //     ...state,
  //     todos: [{text: Math.random().toString(), id: ++idcount}, ...state.todos]
  //   };
  //   vdom.update(v, tplTodos(state));
  // }, 1000);
});
