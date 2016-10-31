module.exports = function(__fest_context) {
    "use strict";
    var __fest_self = this,
        __fest_buf = "",
        __fest_chunks = [],
        __fest_chunk, __fest_attrs = [],
        __fest_select, __fest_if, __fest_iterator, __fest_to, __fest_fn, __fest_html = "",
        __fest_blocks = {},
        __fest_params, __fest_element, __fest_debug_file = "",
        __fest_debug_line = "",
        __fest_debug_block = "",
        __fest_htmlchars = /[&<>"]/g,
        __fest_htmlchars_test = /[&<>"]/,
        __fest_short_tags = {
            "area": true,
            "base": true,
            "br": true,
            "col": true,
            "command": true,
            "embed": true,
            "hr": true,
            "img": true,
            "input": true,
            "keygen": true,
            "link": true,
            "meta": true,
            "param": true,
            "source": true,
            "wbr": true
        },
        __fest_element_stack = [],
        __fest_htmlhash = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;"
        },
        __fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,
        __fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,
        __fest_jshash = {
            "\"": "\\\"",
            "\\": "\\\\",
            "/": "\\/",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\b": "\\b",
            "\f": "\\f",
            "'": "\\'",
            "<": "\\u003C",
            ">": "\\u003E"
        },
        __v0 = {
            children: []
        },
        __vnode, __vattrName, i18n = __fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function(str) {
            return str;
        },
        ___fest_log_error;
    if (typeof __fest_error === "undefined") {
        ___fest_log_error = (typeof console !== "undefined" && console.error) ?
        function() {
            return Function.prototype.apply.call(console.error, console, arguments)
        } : function() {};
    } else {
        ___fest_log_error = __fest_error
    };

    function __fest_log_error(msg) {
        ___fest_log_error(msg + "\nin block \"" + __fest_debug_block + "\" at line: " + __fest_debug_line + "\nfile: " + __fest_debug_file)
    }
    function __fest_replaceHTML(chr) {
        return __fest_htmlhash[chr]
    }
    function __fest_replaceJS(chr) {
        return __fest_jshash[chr]
    }
    function __fest_extend(dest, src) {
        for (var i in src) if (src.hasOwnProperty(i)) dest[i] = src[i];
    }
    function __fest_param(fn) {
        fn.param = true;
        return fn
    }
    function __fest_string(v) {
        return v == null ? "" : v + "";
    }
    function __fest_call(fn, params, cp) {
        if (cp) for (var i in params) if (typeof params[i] == "function" && params[i].param) params[i] = params[i]();
        return fn.call(__fest_self, params)
    }
    function __fest_escapeJS(s) {
        if (typeof s === "string") {
            if (__fest_jschars_test.test(s)) return s.replace(__fest_jschars, __fest_replaceJS);
        } else if (typeof s === "undefined") return "";
        return s;
    }
    function __fest_escapeHTML(s) {
        if (typeof s === "string") {
            if (__fest_htmlchars_test.test(s)) return s.replace(__fest_htmlchars, __fest_replaceHTML);
        } else if (typeof s === "undefined") return "";
        return s;
    }
    var json = __fest_context;
    var __v1 = {
        tag: "div"
    };
    __v0.children.push(__v1);
    __v1.children = __v1.children || [];
    var __v2 = {
        tag: "h3"
    };
    __v1.children.push(__v2);
    __v2.children = __v2.children || [];
    __v2.children.push("What i really should do");
    __v2 = {
        tag: "ul"
    };
    __v1.children.push(__v2);
    var key, value, __fest_iterator0;
    try {
        __fest_iterator0 = json.really || {};
    } catch (e) {
        __fest_iterator = {};
        __fest_log_error(e.message);
    }
    for (key in __fest_iterator0) {
        value = __fest_iterator0[key];
        __v2.children = __v2.children || [];
        var __v3 = {
            tag: "li"
        };
        __v2.children.push(__v3);
        try {
            __v3.children = __v3.children || [];
            __v3.children.push(__fest_string(key))
        } catch (e) {
            __fest_log_error(e.message + "7");
        }
        __v3.children.push("=");
        try {
            __v3.children.push(__fest_string(value))
        } catch (e) {
            __fest_log_error(e.message + "7");
        }
    }
    __v1 = {
        tag: "form",
        attrs: {
            "action": "",
            "data-component-el": "form"
        }
    };
    __v0.children.push(__v1);
    __v1.children = __v1.children || [];
    __v2 = {
        tag: "h3"
    };
    __v1.children.push(__v2);
    try {
        __v2.children = __v2.children || [];
        __v2.children.push(__fest_string(json.newTodo))
    } catch (e) {
        __fest_log_error(e.message + "15");
    }
    __v2 = {
        tag: "div"
    };
    __v1.children.push(__v2);
    try {
        __fest_attrs[0] = __fest_string(json.newTodo)
    } catch (e) {
        __fest_attrs[0] = "";
        __fest_log_error(e.message);
    }
    __v2.children = __v2.children || [];
    __v3 = {
        tag: "input",
        attrs: {
            "type": "text",
            "value": "" + __fest_attrs[0] + "",
            "placeholder": "Add new todo",
            "data-component-el": "newTodo"
        }
    };
    __v2.children.push(__v3);
    __v3 = {
        tag: "button",
        attrs: {
            "type": "submit"
        }
    };
    __v2.children.push(__v3);
    __v3.children = __v3.children || [];
    __v3.children.push("+");
    try {
        __fest_if = json.todos && json.todos.length > 0
    } catch (e) {
        __fest_if = false;
        __fest_log_error(e.message);
    }
    if (__fest_if) {
        __v1 = {
            tag: "ul",
            attrs: {
                "class": "m-todo__list"
            }
        };
        __v0.children.push(__v1);
        var i, todo, __fest_to1, __fest_iterator1;
        try {
            __fest_iterator1 = json.todos || [];
            __fest_to1 = __fest_iterator1.length;
        } catch (e) {
            __fest_iterator1 = [];
            __fest_to1 = 0;
            __fest_log_error(e.message);
        }
        for (i = 0; i < __fest_to1; i++) {
            todo = __fest_iterator1[i];
            __v1.children = __v1.children || [];
            __v2 = {
                tag: "li",
                attrs: {
                    "class": "m-todo__item"
                }
            };
            __v1.children.push(__v2);
            __v2.children = __v2.children || [];
            __v3 = {
                tag: "label"
            };
            __v2.children.push(__v3);
            __v3.children = __v3.children || [];
            var __v4 = {
                tag: "input",
                attrs: {
                    "type": "checkbox"
                }
            };
            __v3.children.push(__v4);
            __v4 = {
                tag: "span"
            };
            __v3.children.push(__v4);
            try {
                __v4.children = __v4.children || [];
                __v4.children.push(__fest_string(todo.text))
            } catch (e) {
                __fest_log_error(e.message + "30");
            }
        }
    }
    __fest_iterator = __fest_chunks.length;
    while (__fest_iterator--) {
        __fest_chunk = __fest_chunks[__fest_iterator];
        if (__fest_chunk) {
            __fest_fn = __fest_blocks[__fest_chunk.name];
            if (__fest_fn) {
                __fest_select = __fest_call(__fest_fn, __fest_chunk.params, __fest_chunk.cp).children;
                if (__fest_chunk.attr) {
                    __fest_chunk.node.attrs[__fest_chunk.attr] += __fest_select.join("");
                } else {
                    __fest_chunk.node.children = __fest_select;
                }
            }
        }
    }
    return __v0;
}