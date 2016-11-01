module.exports = function(ast$b255) {
  return function(json) {
    return [ast$b255('div', {
      "data-id": "todos",
    }, [ast$b255('h1', {}, ['Todos']), ast$b255('h3', {}, [(json.label).toString()]), ast$b255('form', {
      "action": "/add",
      "data-component-el": "form",
      "data-value": "current is: " + (json.label),
    }, [ast$b255('div', {}, [ast$b255('input', {
      "type": "text",
      "value": (json.label),
      "placeholder": "Add new todo",
    }, []), ast$b255('button', {
      "type": "submit",
    }, ['+'])])]), (function() {
      if (json.todos && json.todos.length > 0) {
        return [ast$b255('ul', {
          "class": "m-todo__list",
        }, [(function() {
          var ast$b255$var1 = [],
            i, todo;
          for (i = 0; i < json.todos.length; i++) {
            todo = json.todos[i];
            ast$b255$var1 = ast$b255$var1.concat([ast$b255('li', {
              "class": "m-todo__item",
            }, [ast$b255('form', {
              "action": "/edit/" + (todo.id),
            }, [ast$b255('label', {}, [ast$b255('input', {
              "type": "checkbox",
            }, []), ast$b255('span', {}, [(todo.text).toString()])])])])]);
          }
          return ast$b255$var1;
        }())]), ast$b255('p', {}, ['Total todos:', (json.todos.length).toString()])];
      } else {
        return null;
      }
    }())])];
  };
};
