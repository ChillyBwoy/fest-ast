module.exports = function(ast$19e9) {
  return ast$19e9('fest:template', {
    "xmlns:fest": "http://fest.mail.ru",
    "context_name": "json"
  }, [ast$19e9('h1', {}, ['Todos']), ast$19e9('form', {
    "action": "/add",
    "data-component-el": "form"
  }, [ast$19e9('div', {}, [ast$19e9('input', {
    "type": "text",
    "value": "{json.newTodo}",
    "placeholder": "Add new todo"
  }, []), ast$19e9('button', {
    "type": "submit"
  }, ['+'])])]), ast$19e9('fest:if', {
    "test": "json.todos && json.todos.length > 0"
  }, [ast$19e9('ul', {
    "class": "m-todo__list"
  }, [ast$19e9('fest:for', {
    "iterate": "json.todos",
    "index": "i",
    "value": "todo"
  }, [ast$19e9('li', {
    "class": "m-todo__item"
  }, [ast$19e9('form', {
    "action": "/edit/{todo.id}"
  }, [ast$19e9('label', {}, [ast$19e9('input', {
    "type": "checkbox"
  }, []), ast$19e9('span', {}, [ast$19e9('fest:value', {}, ['todo.text'])])])])])])])])]);
};
