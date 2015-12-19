;(function() {
    var x = Function('return this')();
    if (!x.fest_ast) {
      x.fest_ast = {};
    }
    x.fest_ast['simple.ast'] = function () {
      return {
    "__type": "node",
    "__meta": {
        "name": "template",
        "prefix": "fest",
        "tag": "fest:template"
    },
    "params": "",
    "attrs": {
        "xmlns:fest": "http://fest.mail.ru",
        "context_name": "json"
    },
    "children": [
        {
            "__type": "node",
            "__meta": {
                "tag": "div",
                "name": "div"
            },
            "params": "",
            "attrs": {
                "class": "container"
            },
            "children": [
                {
                    "__type": "node",
                    "__meta": {
                        "tag": "form",
                        "name": "form"
                    },
                    "params": "",
                    "attrs": {
                        "action": "./",
                        "method": "GET"
                    },
                    "children": [
                        {
                            "__type": "node",
                            "__meta": {
                                "tag": "fieldset",
                                "name": "fieldset"
                            },
                            "params": "",
                            "attrs": {},
                            "children": [
                                {
                                    "__type": "node",
                                    "__meta": {
                                        "tag": "legend",
                                        "name": "legend"
                                    },
                                    "params": "",
                                    "attrs": {},
                                    "children": [
                                        {
                                            "__type": "text",
                                            "body": "Person"
                                        }
                                    ]
                                },
                                {
                                    "__type": "node",
                                    "__meta": {
                                        "tag": "div",
                                        "name": "div"
                                    },
                                    "params": "",
                                    "attrs": {},
                                    "children": [
                                        {
                                            "__type": "node",
                                            "__meta": {
                                                "tag": "label",
                                                "name": "label"
                                            },
                                            "params": "",
                                            "attrs": {},
                                            "children": [
                                                {
                                                    "__type": "node",
                                                    "__meta": {
                                                        "tag": "input",
                                                        "name": "input"
                                                    },
                                                    "params": "",
                                                    "attrs": {
                                                        "type": "text",
                                                        "name": "nombre",
                                                        "placeholder": "Nombre"
                                                    },
                                                    "children": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "__type": "node",
                                    "__meta": {
                                        "tag": "div",
                                        "name": "div"
                                    },
                                    "params": "",
                                    "attrs": {},
                                    "children": [
                                        {
                                            "__type": "node",
                                            "__meta": {
                                                "tag": "label",
                                                "name": "label"
                                            },
                                            "params": "",
                                            "attrs": {},
                                            "children": [
                                                {
                                                    "__type": "node",
                                                    "__meta": {
                                                        "tag": "input",
                                                        "name": "input"
                                                    },
                                                    "params": "",
                                                    "attrs": {
                                                        "type": "text",
                                                        "name": "apellido",
                                                        "placeholder": "Apellido"
                                                    },
                                                    "children": []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "__type": "node",
                                    "__meta": {
                                        "tag": "div",
                                        "name": "div"
                                    },
                                    "params": "",
                                    "attrs": {},
                                    "children": [
                                        {
                                            "__type": "node",
                                            "__meta": {
                                                "tag": "label",
                                                "name": "label"
                                            },
                                            "params": "",
                                            "attrs": {},
                                            "children": [
                                                {
                                                    "__type": "node",
                                                    "__meta": {
                                                        "tag": "input",
                                                        "name": "input"
                                                    },
                                                    "params": "",
                                                    "attrs": {
                                                        "type": "text",
                                                        "name": "segundo_apellido",
                                                        "placeholder": "Segundo apellido"
                                                    },
                                                    "children": []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "__type": "node",
                            "__meta": {
                                "name": "if",
                                "prefix": "fest",
                                "tag": "fest:if"
                            },
                            "params": "",
                            "attrs": {
                                "test": "json.done"
                            },
                            "children": [
                                {
                                    "__type": "node",
                                    "__meta": {
                                        "tag": "h1",
                                        "name": "h1"
                                    },
                                    "params": "",
                                    "attrs": {},
                                    "children": [
                                        {
                                            "__type": "text",
                                            "body": "done"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
    };
  }());