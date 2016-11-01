module.exports = function(ast$8d4d) {
  return function(json) {
    return [ast$8d4d('div', {
      "data-id": "todos"
    }, [ast$8d4d('h1', {}, ['Todos']), ast$8d4d('form', {
      "action": "/add",
      "data-component-el": "form",
      "data-value": "current is: {json.newTodo}"
    }, [ast$8d4d('div', {}, [ast$8d4d('input', {
      "type": "text",
      "value": "{json.newTodo}",
      "placeholder": "Add new todo"
    }, []), ast$8d4d('button', {
      "type": "submit"
    }, ['+'])])]), (function() {
      if (json.todos && json.todos.length > 0) {
        return [ast$8d4d('ul', {
          "class": "m-todo__list"
        }, [(function() {
          var ast$8d4d$var1 = [],
            i, todo;
          for (i = 0; i < json.todos.length; i++) {
            todo = json.todos[i];
            ast$8d4d$var1 = ast$8d4d$var1.concat([ast$8d4d('li', {
              "class": "m-todo__item"
            }, [ast$8d4d('form', {
              "action": "/edit/{todo.id}"
            }, [ast$8d4d('label', {}, [ast$8d4d('input', {
              "type": "checkbox"
            }, []), ast$8d4d('span', {}, [(todo.text).toString()])])])])]);
          }
          return ast$8d4d$var1;
        }())]), ast$8d4d('p', {}, ['Total todos:', (json.todos.length).toString()])];
      } else {
        return null;
      }
    }())])];
  };
};
