module.exports = function(d) {
  return function(json = {}, params = {}) {
    return d('node', {
      "name": "template",
      "scope": "fest"
    }, {
      "fest": "http://fest.mail.ru",
      "context_name": "json"
    }, null, [d('node', {
        "name": "div",
        "scope": "xml"
      }, {
        "class": "container"
      }, null, [d('node', {
          "name": "form",
          "scope": "xml"
        }, {
          "action": "./",
          "method": "GET"
        }, null, [
          d('node', {
            "name": "fieldset",
            "scope": "xml"
          }, {}, null, [
            d('node', {
              "name": "legend",
              "scope": "xml"
            }, {}, null, ['Person']),
            d('node', {
              "name": "p",
              "scope": "xml"
            }, {}, null, [
              'Lorem ipsum dolor sit amet,',
              d('node', {
                "name": "strong",
                "scope": "xml"
              }, {}, null, ['consectetur adipisicing elit']),
              ', sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            ]),
            d('node', {
              "name": "div",
              "scope": "xml"
            }, {}, null, [d('node', {
                "name": "label",
                "scope": "xml"
              }, {}, null, [d('node', {
                  "name": "input",
                  "scope": "xml"
                }, {
                  "type": "text",
                  "name": "nombre",
                  "placeholder": "Nombre"
                }, null, [])])]),
            d('node', {
              "name": "div",
              "scope": "xml"
            }, {}, null, [d('node', {
                "name": "label",
                "scope": "xml"
              }, {}, null, [d('node', {
                  "name": "input",
                  "scope": "xml"
                }, {
                  "type": "text",
                  "name": "apellido",
                  "placeholder": "Apellido"
                }, null, [])])]),
            d('node', {
              "name": "div",
              "scope": "xml"
            }, {}, null, [d('node', {
                "name": "label",
                "scope": "xml"
              }, {}, null, [d('node', {
                  "name": "input",
                  "scope": "xml"
                }, {
                  "type": "text",
                  "name": "segundo_apellido",
                  "placeholder": "Segundo apellido"
                }, null, [])])])
          ]),
          d('node', {
            "name": "div",
            "scope": "xml"
          }, {
            "data-label": "for test"
          }, null, [(function() {
              var _$a = [],
                itemIndex,
                item;
              for (itemIndex = 0; itemIndex < json.items.length; itemIndex++) {
                item = json.items[itemIndex];
                _$a = _$a.concat([
                  d('node', {
                    "name": "h3",
                    "scope": "xml"
                  }, {}, null, [item.text]),
                  d('node', {
                    "name": "p",
                    "scope": "xml"
                  }, {}, null, [itemIndex, ':', item.text])
                ]);
              }
              return _$a;
            }())]),
          (function() {
            if (json.done) {
              return d('node', {
                "name": "h1",
                "scope": "xml"
              }, {}, null, ['done']);
            } else {
              return null;
            }
          }())
        ])])]);
  };
};
