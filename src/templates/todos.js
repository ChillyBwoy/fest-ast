module.exports = function(ast$153b) {
  return function(json) {
    return [ast$153b('div', {
      "data-id": "todos"
    }, [ast$153b('h1', {}, ['Todos']), ast$153b('form', {
      "action": "/add",
      "data-component-el": "form",
      "data-value": "current is: ${json.newTodo}"
    }, [ast$153b('div', {}, [ast$153b('input', {
      "type": "text",
      "value": "${json.newTodo}",
      "placeholder": "Add new todo"
    }, []), ast$153b('button', {
      "type": "submit"
    }, ['+'])])]), (function() {
      if (json.todos && json.todos.length > 0) {
        return [ast$153b('ul', {
          "class": "m-todo__list"
        }, [(function() {
          var ast$153b$var1 = [],
            i, todo;
          for (i = 0; i < json.todos.length; i++) {
            todo = json.todos[i];
            ast$153b$var1 = ast$153b$var1.concat([ast$153b('li', {
              "class": "m-todo__item"
            }, [ast$153b('form', {
              "action": "/edit/${todo.id}"
            }, [ast$153b('label', {}, [ast$153b('input', {
              "type": "checkbox"
            }, []), ast$153b('span', {}, [(todo.text).toString()])])])])]);
          }
          return ast$153b$var1;
        }())]), ast$153b('p', {}, ['Total todos:', (json.todos.length).toString()])];
      } else {
        return null;
      }
    }())])];
  };
};
