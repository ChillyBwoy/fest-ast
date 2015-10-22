start =
  element

validchar = [0-9a-zA-Z\-_\{\}\.\:\/]

WS
  = [\t\v\f \u00A0\uFEFF]
  / [\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]

EOL
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028" // line separator
  / "\u2029" // paragraph separator

WSEOL
  = WS
  / EOL

__ "white space character"
  = WSEOL+

_ "white space character"
  = WSEOL*

STRING "string"
  = '"' string:[^"\n\r]* '"' { return string.join(""); }
  / "'" string:[^'\n\r]* "'" { return string.join(""); }






tagText
   = _ content:validchar+ _ {
     return {
       type: 'text',
       body: content.join('')
     };
   }

tagAttrs
  = _ name:validchar+ '="' value:validchar+ '"' _ {
    return [name.join(''), value.join('')];
   }

tagOpen
  = _ "<fest:" chars:validchar+ attrs:tagAttrs* ">" _ {
    return {
      type: 'node',
      name: chars.join(''),
      attrs: attrs.reduce(function (prev, curr) {
        prev[curr[0]] = curr[1];
        return prev;
      }, {}),
      children: []
    };
  }

tagClose
  = _ "</fest:" chars:validchar+ ">" _ {
    return {
      name: chars.join('')
    };
  }

tagSelf
  = _ "<fest:" chars:validchar+  attrs:tagAttrs* "/>" _ {
    return {
      type: 'node',
      name: chars.join(''),
      attrs: attrs.reduce(function (prev, curr) {
        prev[curr[0]] = curr[1];
        return prev;
      }, {}),
      children: []
    };
  }

element
  = text:validchar+ {
    return text.join('');
  }
  / tag:tagSelf{
    return tag;
  }
  / open:tagOpen close:tagClose {
    return open;
  }
  / open:tagOpen all:tagText+ close:tagClose {
    open.children = open.children.concat(all);
    return open;
  }
  / open:tagOpen all:element+ close:tagClose {
    open.children = open.children.concat(all);
    return open;
  }
