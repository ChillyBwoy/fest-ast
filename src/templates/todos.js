module.exports = function(ast$e36f) {
  return function(json) {
    return [ast$e36f('div', {
      "data-id": "todos",
    }, [ast$e36f('h1', {}, [(json.label).toString()]), ast$e36f('p', {}, ['Create new todo:', (json.newTodo).toString()]), ast$e36f('form', {
      "action": "/add",
      "data-component-el": "form",
      "data-value": "current is: " + (json.label),
    }, [ast$e36f('div', {}, [ast$e36f('input', {
      "type": "text",
      "value": (json.newTodo),
      "placeholder": "Add new todo",
      "data-component-el": "newTodo",
    }, []), ast$e36f('button', {
      "type": "submit",
    }, ['+'])])]), (function() {
      if (json.todos && json.todos.length > 0) {
        return [ast$e36f('ul', {
          "class": "m-todo__list",
        }, [(function() {
          var ast$e36f$var1 = [],
            i, todo;
          for (i = 0; i < json.todos.length; i++) {
            todo = json.todos[i];
            ast$e36f$var1 = ast$e36f$var1.concat([ast$e36f('li', {
              "class": "m-todo__item",
            }, [ast$e36f('input', {
              "type": "checkbox",
            }, []), ast$e36f('span', {}, [(todo.id).toString()]), ast$e36f('span', {}, [(todo.text).toString()]), ast$e36f('button', {
              "data-component-el": "delete",
              "data-id": (todo.id),
            }, ['X'])])]);
          }
          return ast$e36f$var1;
        }())]), ast$e36f('p', {}, ['Total todos:', (json.todos.length).toString()])];
      } else {
        return null;
      }
    }())])];
  };
};
