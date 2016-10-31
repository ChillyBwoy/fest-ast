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
    __fest_blocks.element = function(params) {
        var __v0 = {
            attrs: {},
            children: []
        };
        try {
            var blockParams = params.baseParams || params.forParams || params;
            var attrs = blockParams.attrs || {};
            var baseClass = params.baseClass || params.forClass || '';
            var elem = params.elem;
            var htmlDeep = params.htmlDeep;

            if (elem && htmlDeep && !elem.htmlDeep) {
                elem.htmlDeep = htmlDeep
            } else if (!elem && htmlDeep) {
                params.html = htmlDeep;
            }

            if (params.href) {
                attrs.href = params.href;
            }
        } catch (e) {
            __fest_log_error(e.message);
        }
        try {
            __fest_element = ((attrs.href && 'a') || params.tagName || 'div');
            if (typeof __fest_element !== "string") {
                __fest_log_error("Element name must be a string");
                __fest_element = "div"
            }
        } catch (e) {
            __fest_element = "div";
            __fest_log_error(e.message);
        }
        var __v1 = {
            tag: __fest_element
        };
        __v0.children.push(__v1);
        (__v1.attrs === void 0) && (__v1.attrs = {});
        try {
            __fest_select = (baseClass)
        } catch (e) {
            __fest_select = "";
            __fest_log_error(e.message)
        }
        __fest_buf += (__fest_select);
        __v1.attrs["class"] = __fest_select;
        var attrName, attrValue, __fest_iterator0;
        try {
            __fest_iterator0 = attrs || {};
        } catch (e) {
            __fest_iterator = {};
            __fest_log_error(e.message);
        }
        for (attrName in __fest_iterator0) {
            attrValue = __fest_iterator0[attrName];
            __vattrName = null;
            try {
                __fest_select = (attrName);
                __vattrName = __fest_select;
            } catch (e) {
                __fest_select = "";
                __fest_log_error(e.message)
            }
            if (__vattrName) {
                __v1.attrs[__vattrName] = "";
                try {
                    __v1.children = __v1.children || [];
                    __v1.attrs[__vattrName] += (__fest_string(attrValue))
                } catch (e) {
                    __fest_log_error(e.message + "28");
                }
            }
        }
        try {
            __fest_if = params.htmlPrepend
        } catch (e) {
            __fest_if = false;
            __fest_log_error(e.message);
        }
        if (__fest_if) {
            try {
                __v1.children.push(__fest_string(params.htmlPrepend))
            } catch (e) {
                __fest_log_error(e.message + "34");
            }
        }
        try {
            __fest_if = params.html
        } catch (e) {
            __fest_if = false;
            __fest_log_error(e.message);
        }
        if (__fest_if) {
            try {
                __v1.children.push(__fest_string(params.html))
            } catch (e) {
                __fest_log_error(e.message + "37");
            }
        }
        try {
            __fest_if = params.elem
        } catch (e) {
            __fest_if = false;
            __fest_log_error(e.message);
        }
        if (__fest_if) {
            __fest_select = "element";
            __fest_params = {};
            try {
                __fest_params = params.elem
            } catch (e) {
                __fest_log_error(e.message)
            }
            __fest_fn = __fest_blocks[__fest_select];
            if (__fest_fn) {
                __v1.children.push(__fest_call(__fest_fn, __fest_params, false));
            }
        }
        try {
            __fest_if = params.elems
        } catch (e) {
            __fest_if = false;
            __fest_log_error(e.message);
        }
        if (__fest_if) {
            var i, elem, __fest_to1, __fest_iterator1;
            try {
                __fest_iterator1 = params.elems || [];
                __fest_to1 = __fest_iterator1.length;
            } catch (e) {
                __fest_iterator1 = [];
                __fest_to1 = 0;
                __fest_log_error(e.message);
            }
            for (i = 0; i < __fest_to1; i++) {
                elem = __fest_iterator1[i];
                try {
                    __fest_if = elem
                } catch (e) {
                    __fest_if = false;
                    __fest_log_error(e.message);
                }
                if (__fest_if) {
                    __fest_select = "element";
                    __fest_params = {};
                    try {
                        __fest_params = elem
                    } catch (e) {
                        __fest_log_error(e.message)
                    }
                    __fest_fn = __fest_blocks[__fest_select];
                    if (__fest_fn) {
                        __v1.children.push(__fest_call(__fest_fn, __fest_params, false));
                    }
                }
            }
        }
        try {
            __fest_if = params.htmlAppend
        } catch (e) {
            __fest_if = false;
            __fest_log_error(e.message);
        }
        if (__fest_if) {
            try {
                __v1.children.push(__fest_string(params.htmlAppend))
            } catch (e) {
                __fest_log_error(e.message + "50");
            }
        }
        return __v0;
    };
    __fest_blocks.bigsearch = function(params) {
        var __v0 = {
            attrs: {},
            children: []
        };
        __fest_select = "element";
        __fest_params = {};
        try {
            __fest_extend(__fest_params, params)
        } catch (e) {
            __fest_log_error(e.message)
        }
        try {
            __fest_extend(__fest_params, {
                baseClass: 'bigsearch'
            })
        } catch (e) {
            __fest_log_error(e.message)
        }
        __fest_params.html = __fest_param(function() {
            var __v0 = {
                attrs: {},
                children: []
            };
            __fest_select = "form";
            __fest_params = {};
            try {
                __fest_extend(__fest_params, params.form)
            } catch (e) {
                __fest_log_error(e.message)
            }
            __fest_params.html = __fest_param(function() {
                var __v0 = {
                    attrs: {},
                    children: []
                };
                try {
                    __fest_if = params.input
                } catch (e) {
                    __fest_if = false;
                    __fest_log_error(e.message);
                }
                if (__fest_if) {
                    __fest_select = "cell";
                    __fest_params = {};
                    try {
                        __fest_extend(__fest_params, {
                            mods: ['full'],
                            mix: ['padding_right_10']
                        })
                    } catch (e) {
                        __fest_log_error(e.message)
                    }
                    __fest_params.html = __fest_param(function() {
                        var __v0 = {
                            attrs: {},
                            children: []
                        };
                        __fest_select = "input";
                        __fest_params = {};
                        try {
                            __fest_extend(__fest_params, params.input)
                        } catch (e) {
                            __fest_log_error(e.message)
                        }
                        __fest_fn = __fest_blocks[__fest_select];
                        if (__fest_fn) {
                            __v0.children.push(__fest_call(__fest_fn, __fest_params, false));
                        }
                        return __v0;
                    });
                    __fest_fn = __fest_blocks[__fest_select];
                    if (__fest_fn) {
                        __v0.children.push(__fest_call(__fest_fn, __fest_params, true));
                    }
                }
                try {
                    __fest_if = params.button
                } catch (e) {
                    __fest_if = false;
                    __fest_log_error(e.message);
                }
                if (__fest_if) {
                    __fest_select = "cell";
                    __fest_params = {};
                    try {
                        __fest_extend(__fest_params, {
                            mods: ['right']
                        })
                    } catch (e) {
                        __fest_log_error(e.message)
                    }
                    __fest_params.html = __fest_param(function() {
                        var __v0 = {
                            attrs: {},
                            children: []
                        };
                        __fest_select = "button";
                        __fest_params = {};
                        try {
                            __fest_params = params.button
                        } catch (e) {
                            __fest_log_error(e.message)
                        }
                        __fest_fn = __fest_blocks[__fest_select];
                        if (__fest_fn) {
                            __v0.children.push(__fest_call(__fest_fn, __fest_params, false));
                        }
                        return __v0;
                    });
                    __fest_fn = __fest_blocks[__fest_select];
                    if (__fest_fn) {
                        __v0.children.push(__fest_call(__fest_fn, __fest_params, true));
                    }
                }
                try {
                    __fest_if = params.html
                } catch (e) {
                    __fest_if = false;
                    __fest_log_error(e.message);
                }
                if (__fest_if) {
                    try {
                        __v0.children.push(__fest_string(params.html))
                    } catch (e) {
                        __fest_log_error(e.message + "103");
                    }
                }
                return __v0;
            });
            __fest_fn = __fest_blocks[__fest_select];
            if (__fest_fn) {
                __v0.children.push(__fest_call(__fest_fn, __fest_params, true));
            }
            return __v0;
        });
        __fest_fn = __fest_blocks[__fest_select];
        if (__fest_fn) {
            __v0.children.push(__fest_call(__fest_fn, __fest_params, true));
        }
        return __v0;
    };
    __fest_select = "bigsearch";
    __fest_params = {};
    try {
        __fest_extend(__fest_params, {
            "form": {
                "attrs": {
                    "method": "GET",
                    "action": "/search/"
                }
            },
            "input": {
                "icon": {
                    "mods": ["zoom"],
                    "tag": "i",
                    "attrs": {}
                },
                "attrs": {
                    "type": "text",
                    "name": "q",
                    "placeholder": "Поиск"
                }
            },
            "button": {
                "text": "Найти"
            }
        })
    } catch (e) {
        __fest_log_error(e.message)
    }
    __v0.children.push(__vnode = {});
    __fest_chunks.push({
        node: __vnode,
        name: __fest_select,
        params: __fest_params,
        cp: false
    });
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