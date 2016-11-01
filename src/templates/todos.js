module.exports = function(ast$131f) {
  return function(json) {
    return [ast$131f('div', {
      "data-id": "todos"
    }, [ast$131f('h1', {}, [(json.label)]), ast$131f('p', {}, ['Create new todo:', (json.newTodo)]), ast$131f('form', {
      "action": "/add",
      "data-component-el": "form",
      "data-value": "current is: " + (json.label)
    }, [ast$131f('div', {}, [ast$131f('input', {
      "type": "text",
      "value": (json.newTodo),
      "placeholder": "Add new todo",
      "data-component-el": "newTodo"
    }, []), ast$131f('button', {
      "type": "submit"
    }, ['+'])])]), (function() {
      var ast$131f$var1 = [];
      if (json.todos && json.todos.length > 0) {
        ast$131f$var1.push(ast$131f('ul', {
          "class": "m-todo__list"
        }, [(function() {
          var ast$131f$var2 = [],
            i, todo;
          for (i = 0; i < json.todos.length; i++) {
            todo = json.todos[i];
            ast$131f$var2.push([ast$131f('li', {
              "class": "m-todo__item"
            }, [ast$131f('input', {
              "type": "checkbox",
              "value": (todo.id)
            }, []), ast$131f('em', {}, [(todo.id)]), ':', ast$131f('span', {}, [(todo.text)]), ast$131f('button', {
              "data-component-el": "delete",
              "data-id": (todo.id)
            }, ['X'])])]);
          }
          return ast$131f$var2;
        }())]), ast$131f('p', {}, ['Total todos:', (json.todos.length)]));
      };
      return ast$131f$var1;
    }())])];
  };
};
