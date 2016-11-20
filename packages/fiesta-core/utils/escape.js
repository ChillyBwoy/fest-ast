const HTML_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
const HTML_CHARS_TEST = /[&<>"]/;
const HTML_CHARS = /[&<>"]/g;

const JS_MAP = {
  '"': '\\"',
  '\\': '\\\\',
  '/': '\\/',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  "'": "\\'",
  '<': '\\u003C',
  '>': '\\u003E'
};
const JS_CHARS_TEST = /[\\'"\/\n\r\t\b\f<>]/;
const JS_CHARS = /[\\'"\/\n\r\t\b\f<>]/g;

const STR_MAP = {
  '\\': '\\\\',
  '/': '\\/',
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  "'": "\\'"
};
const STR_CHARS_TEST = /[\\'"\/\n\r\t\b\f]/;
const STR_CHARS = /[\\'"\/\n\r\t\b\f]/g;

function createEscape(charsMap, charsTest, chars) {
  function passReplace(chr) {
    return charsMap[chr];
  }

  return function pass(s) {
    if (typeof s === 'string') {
      if (charsTest.test(s)) {
        return s.replace(chars, passReplace);
      }
    } else if (typeof s === 'undefined') {
      return '';
    }
    return s;
  };
}

const escapeJS = createEscape(JS_MAP, JS_CHARS_TEST, JS_CHARS);
const escapeHTML = createEscape(HTML_MAP, HTML_CHARS_TEST, HTML_CHARS);
const escapeStr = createEscape(STR_MAP, STR_CHARS_TEST, STR_CHARS);

module.exports = {
  escapeJS,
  escapeHTML,
  escapeStr
};
