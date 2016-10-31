module.exports = function(d) {
  return function(json = {}, params = {}) {
    return d('node', {
      "name": "template",
      "scope": "fest"
    }, {
      "fest": "http://fest.mail.ru",
      "context_name": "json"
    }, null, [
      d('node', {
        "name": "div",
        "scope": "xml"
      }, {}, null, [
        d('node', {
          "name": "h3",
          "scope": "xml"
        }, {}, null, ['What i really should do']),
        d('node', {
          "name": "ul",
          "scope": "xml"
        }, {}, null, [(function() {
            var _$a = [],
              key,
              value;
            for (key in json.really) {
              if (json.really.hasOwnProperty(key)) {
                value = json.really[key];
                _$a = _$a.concat([d('node', {
                    "name": "li",
                    "scope": "xml"
                  }, {}, null, [key, '=', value])]);
              }
            }
            return _$a;
          }())])
      ]),
      d('node', {
        "name": "form",
        "scope": "xml"
      }, {
        "action": "",
        "data-component-el": "form"
      }, null, [
        d('node', {
          "name": "h3",
          "scope": "xml"
        }, {}, null, [json.newTodo]),
        d('node', {
          "name": "div",
          "scope": "xml"
        }, {}, null, [
          d('node', {
            "name": "input",
            "scope": "xml"
          }, {
            "type": "text",
            "value": "{json.newTodo}",
            "placeholder": "Add new todo",
            "data-component-el": "newTodo"
          }, null, []),
          d('node', {
            "name": "button",
            "scope": "xml"
          }, {
            "type": "submit"
          }, null, ['+'])
        ])
      ]),
      (function() {
        if (json.todos && json.todos.length > 0) {
          return d('node', {
            "name": "ul",
            "scope": "xml"
          }, {
            "class": "m-todo__list"
          }, null, [(function() {
              var _$a = [],
                i,
                todo;
              for (i = 0; i < json.todos.length; i++) {
                todo = json.todos[i];
                _$a = _$a.concat([d('node', {
                    "name": "li",
                    "scope": "xml"
                  }, {
                    "class": "m-todo__item"
                  }, null, [d('node', {
                      "name": "label",
                      "scope": "xml"
                    }, {}, null, [
                      d('node', {
                        "name": "input",
                        "scope": "xml"
                      }, {
                        "type": "checkbox"
                      }, null, []),
                      d('node', {
                        "name": "span",
                        "scope": "xml"
                      }, {}, null, [todo.text])
                    ])])]);
              }
              return _$a;
            }())]);
        } else {
          return null;
        }
      }())
    ]);
  };
};
