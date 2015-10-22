start =
    element

validchar = [0-9a-zA-Z\-_\{\}\.\:\/]
    
_ = [ \t\r\n]*


tagAttrs = 
    _ name:validchar+ '="' value:validchar+ '"' _ {
     return [name.join(''), value.join('')];
   }

tagOpen = 
    _ "<fest:" chars:validchar+ attrs:tagAttrs* ">" _ {
       return {
         name: chars.join(''),
         attrs: attrs.reduce(function (prev, curr) {
             prev[curr[0]] = curr[1];
             return prev;
         }, {})
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
         name: chars.join(''),
         attrs: attrs.reduce(function (prev, curr) {
             prev[curr[0]] = curr[1];
             return prev;
         }, {})
       };
    }

element = 
    text:validchar {
       return '';
    }
  / tag:tagSelf{
        return tag;
    }
  / open:tagOpen close:tagClose {
        return open;
    }
  / open:tagOpen all:element+ close:tagClose {
        return [open].concat([all]);
    }