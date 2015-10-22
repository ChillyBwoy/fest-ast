start =
    element

validchar = [0-9a-zA-Z\-_\{\}\.\:\/]

_ = [ \t\r\n]*

tagText =
   _ content:validchar+ _ {
      return {
          type: 'text',
          body: content.join('')
      };
   }

tagAttrs =
    _ name:validchar+ '="' value:validchar+ '"' _ {
     return [name.join(''), value.join('')];
   }

tagOpen =
    _ "<fest:" chars:validchar+ attrs:tagAttrs* ">" _ {
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

tagClose =
    _ "</fest:" chars:validchar+ ">" _ {
       return {
         name: chars.join('')
       };
    }

tagSelf =
    _ "<fest:" chars:validchar+  attrs:tagAttrs* "/>" _ {
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

element =
    text:validchar+ {
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
