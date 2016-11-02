module.exports = function(ast$25c8e403) {
  return function(json) {
    return [ast$25c8e403('div', {
      "data-id": "todos"
    }, [ast$25c8e403('h1', {}, [("" + (json.label))]), ast$25c8e403('p', {}, ['Create new todo:', ("" + (json.newTodo))]), ast$25c8e403('form', {
      "action": "/add",
      "data-component-el": "form",
      "data-value": "current is: " + ("" + (json.label))
    }, [ast$25c8e403('div', {}, [ast$25c8e403('input', {
      "type": "text",
      "value": ("" + (json.newTodo)),
      "placeholder": "Add new todo",
      "data-component-el": "newTodo"
    }, []), ast$25c8e403('button', {
      "type": "submit"
    }, ['+'])])]), (function() {
      var ast$25c8e403$__1 = [];
      if (json.todos && json.todos.length > 0) {
        ast$25c8e403$__1.push(ast$25c8e403('ul', {
          "class": "m-todo__list"
        }, [(function() {
          var ast$25c8e403$__2 = [],
            ast$25c8e403$__3 = json.todos.length,
            i, todo;
          for (i = 0; i < ast$25c8e403$__3; i++) {
            todo = json.todos[i];
            ast$25c8e403$__2.push([ast$25c8e403('li', {
              "class": "m-todo__item"
            }, [ast$25c8e403('input', {
              "type": "checkbox"
            }, []), ast$25c8e403('em', {}, [("" + (todo.id))]), ':', ast$25c8e403('span', {}, [("" + (todo.text))]), ast$25c8e403('button', {
              "data-component-el": "delete",
              "data-id": ("" + (todo.id))
            }, ['X'])])]);
          }
          return ast$25c8e403$__2;
        }())]), ast$25c8e403('p', {}, ['Total todos:', ("" + (json.todos.length))]));
      };
      return ast$25c8e403$__1;
    }())])];
  };
};
