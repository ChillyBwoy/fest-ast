module.exports = function(ast$5f0b) {
  return ast$5f0b('fest:template', {
    "xmlns:fest": "http://fest.mail.ru",
    "context_name": "json"
  }, [ast$5f0b('fest:set', {
    "name": "element"
  }, [ast$5f0b('fest:script', {}, ['var blockParams = params.baseParams || params.forParams || params;var attrs = blockParams.attrs || {};var baseClass = params.baseClass || params.forClass || '
    ';var elem = params.elem;var htmlDeep = params.htmlDeep;if (elem && htmlDeep && !elem.htmlDeep) {elem.htmlDeep = htmlDeep} else if (!elem && htmlDeep) {params.html = htmlDeep;}if (params.href) {attrs.href = params.href;}'
  ]), ast$5f0b('fest:element', {
    "name": "{(attrs.href && 'a') || params.tagName || 'div'}"
  }, [ast$5f0b('fest:attributes', {}, [ast$5f0b('fest:attribute', {
    "name": "class",
    "value": "{baseClass}"
  }, []), ast$5f0b('fest:each', {
    "iterate": "attrs",
    "index": "attrName",
    "value": "attrValue"
  }, [ast$5f0b('fest:attribute', {
    "name": "{attrName}"
  }, [ast$5f0b('fest:value', {}, ['attrValue'])])])]), ast$5f0b('fest:if', {
    "test": "params.htmlPrepend"
  }, [ast$5f0b('fest:value', {
    "output": "text"
  }, ['params.htmlPrepend'])]), ast$5f0b('fest:if', {
    "test": "params.html"
  }, [ast$5f0b('fest:value', {
    "output": "text"
  }, ['params.html'])]), ast$5f0b('fest:if', {
    "test": "params.elem"
  }, [ast$5f0b('fest:get', {
    "name": "element"
  }, ['params.elem'])]), ast$5f0b('fest:if', {
    "test": "params.elems"
  }, [ast$5f0b('fest:for', {
    "iterate": "params.elems",
    "index": "i",
    "value": "elem"
  }, [ast$5f0b('fest:if', {
    "test": "elem"
  }, [ast$5f0b('fest:get', {
    "name": "element"
  }, ['elem'])])])]), ast$5f0b('fest:if', {
    "test": "params.htmlAppend"
  }, [ast$5f0b('fest:value', {
    "output": "text"
  }, ['params.htmlAppend'])])])]), ast$5f0b('fest:set', {
    "name": "bigsearch"
  }, [ast$5f0b('fest:get', {
    "name": "element"
  }, [ast$5f0b('fest:params', {}, ['params']), ast$5f0b('fest:params', {}, ['{baseClass: '
    bigsearch '}'
  ]), ast$5f0b('fest:param', {
    "name": "html"
  }, [ast$5f0b('fest:get', {
    "name": "form"
  }, [ast$5f0b('fest:params', {}, ['params.form']), ast$5f0b('fest:param', {
    "name": "html"
  }, [ast$5f0b('fest:if', {
    "test": "params.input"
  }, [ast$5f0b('fest:get', {
    "name": "cell"
  }, [ast$5f0b('fest:params', {}, ['{mods: ['
    full '],mix: ['
    padding_right_10 ']}'
  ]), ast$5f0b('fest:param', {
    "name": "html"
  }, [ast$5f0b('fest:get', {
    "name": "input"
  }, [ast$5f0b('fest:params', {}, ['params.input'])])])])]), ast$5f0b('fest:if', {
    "test": "params.button"
  }, [ast$5f0b('fest:get', {
    "name": "cell"
  }, [ast$5f0b('fest:params', {}, ['{mods: ['
    right ']}'
  ]), ast$5f0b('fest:param', {
    "name": "html"
  }, [ast$5f0b('fest:get', {
    "name": "button"
  }, ['params.button'])])])]), ast$5f0b('fest:if', {
    "test": "params.html"
  }, [ast$5f0b('fest:value', {
    "output": "text"
  }, ['params.html'])])])])])])]), ast$5f0b('fest:get', {
    "name": "bigsearch"
  }, [ast$5f0b('fest:params', {}, ['{form: {attrs: {method: '
    GET ',action: ' / search / '}},"input": {"icon": {"mods": ["zoom"],"tag": "i","attrs": {}},"attrs": {"type": "text","name": "q","placeholder": "Поиск"}},"button": {"text": "Найти"}}'
  ])])]);
};
