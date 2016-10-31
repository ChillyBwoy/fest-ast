module.exports = function(r) {
    return function(json = {}, params = {}) {
        return r('node', {
            "name": "template",
            "scope": "fest"
        }, {
            "fest": "http://fest.mail.ru",
            "context_name": "json"
        }, [r('node', {
            "name": "set",
            "scope": "fest"
        }, {
            "name": "element"
        }, [r('node', {
            "name": "script",
            "scope": "fest"
        }, {}, []), r('node', {
            "name": "element",
            "scope": "fest"
        }, {
            "name": "{(attrs.href && 'a') || params.tagName || 'div'}"
        }, [r('node', {
            "name": "attributes",
            "scope": "fest"
        }, {}, [r('node', {
            "name": "attribute",
            "scope": "fest"
        }, {
            "name": "class",
            "value": "{baseClass}"
        }, []), (function() {
            var _$a = [],
                attrName, attrValue;
            for (attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    attrValue = attrs[attrName];
                    _$a = _$a.concat([r('node', {
                        "name": "attribute",
                        "scope": "fest"
                    }, {
                        "name": "{attrName}"
                    }, [attrValue])]);
                }
            }
            return _$a;
        }())]), (function() {
            if (params.htmlPrepend) {
                return params.htmlPrepend;
            } else {
                return null;
            }
        }()), (function() {
            if (params.html) {
                return params.html;
            } else {
                return null;
            }
        }()), (function() {
            if (params.elem) {
                return r('node', {
                    "name": "get",
                    "scope": "fest"
                }, {
                    "name": "element"
                }, ['params.elem']);
            } else {
                return null;
            }
        }()), (function() {
            if (params.elems) {
                return (function() {
                    var _$a = [],
                        i, elem;
                    for (i = 0; i < params.elems.length; i++) {
                        elem = params.elems[i];
                        _$a = _$a.concat([(function() {
                            if (elem) {
                                return r('node', {
                                    "name": "get",
                                    "scope": "fest"
                                }, {
                                    "name": "element"
                                }, ['elem']);
                            } else {
                                return null;
                            }
                        }())]);
                    }
                    return _$a;
                }());
            } else {
                return null;
            }
        }()), (function() {
            if (params.htmlAppend) {
                return params.htmlAppend;
            } else {
                return null;
            }
        }())])]), r('node', {
            "name": "set",
            "scope": "fest"
        }, {
            "name": "bigsearch"
        }, [r('node', {
            "name": "get",
            "scope": "fest"
        }, {
            "name": "element"
        }, [r('node', {
            "name": "params",
            "scope": "fest"
        }, {}, []), r('node', {
            "name": "params",
            "scope": "fest"
        }, {}, []), r('node', {
            "name": "param",
            "scope": "fest"
        }, {
            "name": "html"
        }, [r('node', {
            "name": "get",
            "scope": "fest"
        }, {
            "name": "form"
        }, [r('node', {
            "name": "params",
            "scope": "fest"
        }, {}, []), r('node', {
            "name": "param",
            "scope": "fest"
        }, {
            "name": "html"
        }, [(function() {
            if (params.input) {
                return r('node', {
                    "name": "get",
                    "scope": "fest"
                }, {
                    "name": "cell"
                }, [r('node', {
                    "name": "params",
                    "scope": "fest"
                }, {}, []), r('node', {
                    "name": "param",
                    "scope": "fest"
                }, {
                    "name": "html"
                }, [r('node', {
                    "name": "get",
                    "scope": "fest"
                }, {
                    "name": "input"
                }, [r('node', {
                    "name": "params",
                    "scope": "fest"
                }, {}, [])])])]);
            } else {
                return null;
            }
        }()), (function() {
            if (params.button) {
                return r('node', {
                    "name": "get",
                    "scope": "fest"
                }, {
                    "name": "cell"
                }, [r('node', {
                    "name": "params",
                    "scope": "fest"
                }, {}, []), r('node', {
                    "name": "param",
                    "scope": "fest"
                }, {
                    "name": "html"
                }, [r('node', {
                    "name": "get",
                    "scope": "fest"
                }, {
                    "name": "button"
                }, ['params.button'])])]);
            } else {
                return null;
            }
        }()), (function() {
            if (params.html) {
                return params.html;
            } else {
                return null;
            }
        }())])])])])]), r('node', {
            "name": "get",
            "scope": "fest"
        }, {
            "name": "bigsearch"
        }, [r('node', {
            "name": "params",
            "scope": "fest"
        }, {}, [])])]);
    };
};