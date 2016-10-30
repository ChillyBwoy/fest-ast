module.exports = function(r) {
  return r('node', 'fest:template', {
    "xmlns:fest": "http://fest.mail.ru",
    "context_name": "json"
  }, null, [r('node', 'div', {
      "class": "container"
    }, null, [r('node', 'form', {
        "action": "./",
        "method": "GET"
      }, null, [
        r('node', 'fieldset', {}, null, [
          r('node', 'legend', {}, null, [r('text', 'null', {}, null, ['Person'])]),
          r('node', 'div', {}, null, [r('node', 'label', {}, null, [r('node', 'input', {
                "type": "text",
                "name": "nombre",
                "placeholder": "Nombre"
              }, null, [])])]),
          r('node', 'div', {}, null, [r('node', 'label', {}, null, [r('node', 'input', {
                "type": "text",
                "name": "apellido",
                "placeholder": "Apellido"
              }, null, [])])]),
          r('node', 'div', {}, null, [r('node', 'label', {}, null, [r('node', 'input', {
                "type": "text",
                "name": "segundo_apellido",
                "placeholder": "Segundo apellido"
              }, null, [])])])
        ]),
        r('node', 'fest:if', {
          "test": "json.done"
        }, null, [r('node', 'h1', {}, null, [r('text', 'null', {}, null, ['done'])])])
      ])])]);
};
