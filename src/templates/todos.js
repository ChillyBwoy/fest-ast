module.exports = function(d) {
    return function(json = {}, params = {}) {
        return d('node', {
            "name": "template",
            "scope": "fest"
        }, {
            "fest": "http://fest.mail.ru",
            "context_name": "json"
        }, [d('node', {
            "name": "div",
            "scope": ""
        }, {}, [d('node', {
            "name": "h3",
            "scope": ""
        }, {}, ['What i really should do']), d('node', {
            "name": "ul",
            "scope": ""
        }, {}, [(function() {
            var _$a = [],
                key, value;
            for (key in json.really) {
                if (json.really.hasOwnProperty(key)) {
                    value = json.really[key];
                    _$a = _$a.concat([d('node', {
                        "name": "li",
                        "scope": ""
                    }, {}, [key, '=', value])]);
                }
            }
            return _$a;
        }())])]), d('node', {
            "name": "form",
            "scope": ""
        }, {
            "action": "",
            "data-component-el": "form"
        }, [d('node', {
            "name": "h3",
            "scope": ""
        }, {}, [json.newTodo]), d('node', {
            "name": "div",
            "scope": ""
        }, {}, [d('node', {
            "name": "input",
            "scope": ""
        }, {
            "type": "text",
            "value": "{json.newTodo}",
            "placeholder": "Add new todo",
            "data-component-el": "newTodo"
        }, []), d('node', {
            "name": "button",
            "scope": ""
        }, {
            "type": "submit"
        }, ['+'])])]), (function() {
            if (json.todos && json.todos.length > 0) {
                return d('node', {
                    "name": "ul",
                    "scope": ""
                }, {
                    "class": "m-todo__list"
                }, [(function() {
                    var _$a = [],
                        i, todo;
                    for (i = 0; i < json.todos.length; i++) {
                        todo = json.todos[i];
                        _$a = _$a.concat([d('node', {
                            "name": "li",
                            "scope": ""
                        }, {
                            "class": "m-todo__item"
                        }, [d('node', {
                            "name": "label",
                            "scope": ""
                        }, {}, [d('node', {
                            "name": "input",
                            "scope": ""
                        }, {
                            "type": "checkbox"
                        }, []), d('node', {
                            "name": "span",
                            "scope": ""
                        }, {}, [todo.text])])])]);
                    }
                    return _$a;
                }())]);
            } else {
                return null;
            }
        }())]);
    };
};