{
  function getComment (content) {
    return {
      type: 'comment',
      attrs: {},
      children: [content]
    };
  }

  function getCData (content) {
    return {
      type: 'cdata',
      attrs: {},
      children: [content]
    };
  }

  function getText (chars) {
    return chars.join('').trim();
  }

  function getNode (node, attrs) {
    return {
      type: node,
      attrs: attrs.reduce((prev, curr) => {
        prev[curr[0]] = curr[1];
        return prev;
      }, {}),
      children: []
    };
  }

  function parseParams (source) {
    let params = source.filter(item => typeof item === 'string').join('');
    return params;
  }
}

Start
  = Prolog _ el:Element {
      return el;
    }
  / Element

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

Chars = ([^<\n\r]+)

String "string"
  = '"' string:[^"\n\r]* '"' {
  	  return string.join('');
    }
  / "'" string:[^'\n\r]* "'" {
      return string.join('');
    }

StringWithExpr
  = '"' head:[^"\n\r\{]* '{' expr:[^"\n\r\{\}]+ '}' tail:[^"\n\r\}]* '"' {
      return `${head.join('')}\${${expr.join('')}}${tail.join('')}`;
    }
  / "'" head:[^'\n\r\{]* '{' expr:[^'\n\r\{\}]+ '}' tail:[^'\n\r\}]* "'" {
      return `${head.join('')}\${${expr.join('')}}${tail.join('')}`;
    }

NameStartChar
  = [A-Z] / "_" / [a-z] / [\u00C0-\u00D6] / [\u00D8-\u00F6]
  / [\u00F8-\u02FF] / [\u0370-\u037D] / [\u037F-\u1FFF] / [\u200C-\u200D]
  / [\u2070-\u218F] / [\u2C00-\u2FEF] / [\u3001-\uD7FF] / [\uF900-\uFDCF] / [\uFDF0-\uFFFD]

NameChar
  = NameStartChar / "-" / "." / [0-9] / [\u00B7] / [\u0300-\u036F] / [\u203F-\u2040]

Identifier
  = first:NameStartChar last:NameChar* {
      return first + last.join('');
    }

Identity "qualified identifier"
	= scope:Identifier ':' name:Identifier {
      return `${scope}:${name}`
    }
	/ name:Identifier {
      return name;
    }
/*
AttributeContent
  = _ '=' _ value:StringWithExpr {
      return value;
    }
  / _ '=' _ value:String {
  	  return value;
  	}
*/
AttributeContent
  = _ '=' _ value:String {
      return value;
    }

Attribute
  = _ identity:Identity value:AttributeContent? {
      return [identity, value];
    }

TagOpen
  = '<' identity:Identity attrs:Attribute* _ '>' {
      return getNode(identity, attrs);
    }

TagClose
  = '</' Identity '>'

TagSelf
  = '<' identity:Identity attrs:Attribute* _ '/>' {
      return getNode(identity, attrs);
    }

Element
  = _ tag:TagOpen _ contents:ElementContent* _ TagClose _ {
      // Fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu!!!!
      if (tag.type.startsWith('fest:')) {
        const [scope, name] = tag.type.split(':');
        switch (name) {
          case 'params':
            tag.children = [parseParams(contents)]
            break;

          case 'get':
            // tag.params += parseParams(contents);
            tag.children = tag.children.concat(
              contents.filter(c => typeof c !== 'text')
            );
            break;

          case 'script':
            tag.children = [parseParams(contents)]
            break;

          default:
            tag.children = tag.children.concat(contents);
            break;
        }
        return tag;
      } else {
        tag.children = tag.children.concat(contents);
        return tag;
      }

    }
  / _ tag:TagSelf {
      return tag;
    }

ElementContent
  = CData
  / Comment
  / Element
  / ElementValue

ElementValue
  = _ chars:Chars _ {
      return getText(chars);
    }

CData "CDATA"
  = '<![CDATA[' content:CDataContent {
      return getCData(content);
    }

CDataContent
  = ']]>'
  / head:. tail:CDataContent {
      return head + tail;
    }

Comment "comment"
  = '<!--' content:CommentContent {
      return getComment(content);
    }

CommentContent
  = '-->' {
      return '';
    }
  / head:. tail:CommentContent {
      return head + tail;
    }

PI
  = '<?' Identifier __ PIContent

PIContent
  = '?>'
  / __ PIContent
  / . PIContent

Prolog
  = '<?xml'i
    _ XmlVersion _
    ( Encoding _ )?
    ( Standalone _ )?
    '?>'

XmlVersion
  = 'version'i _ '=' _ String

Encoding
  = 'encoding'i _ '=' _ String

Standalone
  = 'standalone'i _ '=' _ String
