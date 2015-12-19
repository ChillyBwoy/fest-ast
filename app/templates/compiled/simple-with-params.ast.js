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
                "name": "set",
                "prefix": "fest",
                "tag": "fest:set"
            },
            "params": "",
            "attrs": {
                "name": "p-contact"
            },
            "children": [
                {
                    "__type": "node",
                    "__meta": {
                        "name": "get",
                        "prefix": "fest",
                        "tag": "fest:get"
                    },
                    "params": "",
                    "attrs": {
                        "name": "entity"
                    },
                    "children": [
                        {
                            "__type": "node",
                            "__meta": {
                                "name": "params",
                                "prefix": "fest",
                                "tag": "fest:params"
                            },
                            "params": "params",
                            "attrs": {},
                            "children": []
                        },
                        {
                            "__type": "node",
                            "__meta": {
                                "name": "params",
                                "prefix": "fest",
                                "tag": "fest:params"
                            },
                            "params": "{href: null,baseClass: 'p-contact',entityParams: {mods: ['last']}}",
                            "attrs": {},
                            "children": []
                        },
                        {
                            "__type": "node",
                            "__meta": {
                                "name": "param",
                                "prefix": "fest",
                                "tag": "fest:param"
                            },
                            "params": "",
                            "attrs": {
                                "name": "html"
                            },
                            "children": [
                                {
                                    "__type": "node",
                                    "__meta": {
                                        "tag": "span",
                                        "name": "span"
                                    },
                                    "params": "",
                                    "attrs": {
                                        "class": "p-contact__inner"
                                    },
                                    "children": [
                                        {
                                            "__type": "node",
                                            "__meta": {
                                                "name": "if",
                                                "prefix": "fest",
                                                "tag": "fest:if"
                                            },
                                            "params": "",
                                            "attrs": {
                                                "test": "params.src"
                                            },
                                            "children": [
                                                {
                                                    "__type": "node",
                                                    "__meta": {
                                                        "tag": "span",
                                                        "name": "span"
                                                    },
                                                    "params": "",
                                                    "attrs": {
                                                        "class": "p-contact__left"
                                                    },
                                                    "children": [
                                                        {
                                                            "__type": "node",
                                                            "__meta": {
                                                                "tag": "img",
                                                                "name": "img"
                                                            },
                                                            "params": "",
                                                            "attrs": {
                                                                "class": "p-contact__img",
                                                                "src": "{params.src}"
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
                                                "tag": "span",
                                                "name": "span"
                                            },
                                            "params": "",
                                            "attrs": {
                                                "class": "p-contact__content"
                                            },
                                            "children": [
                                                {
                                                    "__type": "node",
                                                    "__meta": {
                                                        "name": "if",
                                                        "prefix": "fest",
                                                        "tag": "fest:if"
                                                    },
                                                    "params": "",
                                                    "attrs": {
                                                        "test": "params.title"
                                                    },
                                                    "children": [
                                                        {
                                                            "__type": "node",
                                                            "__meta": {
                                                                "name": "get",
                                                                "prefix": "fest",
                                                                "tag": "fest:get"
                                                            },
                                                            "params": "{baseClass: 'p-contact__title',href: params.href,tagName: 'span',html: params.title}",
                                                            "attrs": {
                                                                "name": "element"
                                                            },
                                                            "children": []
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
                                                        "test": "params.param"
                                                    },
                                                    "children": [
                                                        {
                                                            "__type": "node",
                                                            "__meta": {
                                                                "tag": "span",
                                                                "name": "span"
                                                            },
                                                            "params": "",
                                                            "attrs": {
                                                                "class": "p-contact__param"
                                                            },
                                                            "children": [
                                                                {
                                                                    "__type": "node",
                                                                    "__meta": {
                                                                        "name": "value",
                                                                        "prefix": "fest",
                                                                        "tag": "fest:value"
                                                                    },
                                                                    "params": "",
                                                                    "attrs": {
                                                                        "output": "text"
                                                                    },
                                                                    "children": [
                                                                        {
                                                                            "__type": "text",
                                                                            "body": "params.param"
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
                                        "test": "params.button"
                                    },
                                    "children": [
                                        {
                                            "__type": "node",
                                            "__meta": {
                                                "name": "get",
                                                "prefix": "fest",
                                                "tag": "fest:get"
                                            },
                                            "params": "fest._helpers.mergeParams(params.button,{ mix: ['margin_top_10'] })",
                                            "attrs": {
                                                "name": "button"
                                            },
                                            "children": []
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
                                        "test": "params.html"
                                    },
                                    "children": [
                                        {
                                            "__type": "node",
                                            "__meta": {
                                                "name": "value",
                                                "prefix": "fest",
                                                "tag": "fest:value"
                                            },
                                            "params": "",
                                            "attrs": {
                                                "output": "text"
                                            },
                                            "children": [
                                                {
                                                    "__type": "text",
                                                    "body": "params.html"
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
        }
    ]
};
    };
  }());