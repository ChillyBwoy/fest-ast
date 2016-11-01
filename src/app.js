import { createStore } from 'redux';
import { createVDOM } from '../lib/vdom';

import tplTodos from './templates/todos';

function createCollector (elSel, attrSel) {
  return {
    group($root) {
      const $nodes = $root.querySelectorAll(elSel);
      const nodeList = Array.prototype.slice.call($nodes);

      return nodeList.reduce((acc, $el) => {
        const name = $el.getAttribute(attrSel);
        if (!(name in acc)) {
          acc[name] = [];
        }
        acc[name] = acc[name].concat($el);
        return acc;
      }, {});
    },

    elements($root, elementName) {
      const $nodes = $root.querySelectorAll(elSel);
      const nodeList = Array.prototype.slice.call($nodes);
      return nodeList.filter(($el) => {
        const name = $el.getAttribute(attrSel);
        return name === elementName;
      });
    }
  };
}

function bindEventsTo ($root, events) {
  let selectors = Object.keys(events);
  let eventsBinded = {};

  return function (getElements) {
    for (let sel of selectors) {
      const [eventName, elementName] = sel.split(':');
      if (!eventsBinded[eventName]) {
        eventsBinded[eventName] = [];
        $root.addEventListener(eventName, (event) => {
          eventsBinded[eventName].forEach(({ elementName, handler }) => {
            let { target } = event;
            if (!target) {
              return;
            }

            let $elements = getElements(elementName);
            while (target !== $root) {
              if ($elements.indexOf(target) !== -1) {
                handler(event);
                return;
              }
              target = target.parentNode;
            }
          });
        });
      }
      eventsBinded[eventName] = eventsBinded[eventName].concat({
        elementName,
        handler: events[sel]
      });
    }
  };
}

let nextTodoId = 0;

// actions
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    todo: {
      id: ++nextTodoId,
      text
    }
  };
};

const updateNewTodo = (newTodo) => {
  return {
    type: 'UPDATE_NEW_TODO',
    newTodo
  };
};

const deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  };
};

// reducer
const todos = (state = {
  label: 'Initial state',
  newTodo: '',
  todos: []
}, action) => {
  switch (action.type) {
    case 'UPDATE_NEW_TODO':
      return {
        ...state,
        newTodo: action.newTodo
      };

    case 'ADD_TODO':
      return {
        ...state,
        newTodo: '',
        todos: [action.todo, ...state.todos]
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id)
      };

    default:
      return state;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const $root = document.getElementById('root');
  const $collector = createCollector('[data-component-el]', 'data-component-el');
  const vdom = createVDOM($root, tplTodos);

  const store = createStore(todos);
  store.subscribe(() => {
    vdom(store.getState());
  });

  vdom(store.getState());

  const events = {
    'submit:form': (event) => {
      event.preventDefault();
      const { newTodo } = store.getState();
      store.dispatch(addTodo(newTodo));
    },

    'input:newTodo': (event) => {
      const { value } = event.target;
      store.dispatch(updateNewTodo(value));
    },

    'click:delete': (event) => {
      event.preventDefault();
      const { target } = event;
      const id = parseInt(target.getAttribute('data-id'), 10);
      store.dispatch(deleteTodo(id));
    }
  };
  const handle = bindEventsTo($root, events);

  handle(name => $collector.elements($root, name));
});
