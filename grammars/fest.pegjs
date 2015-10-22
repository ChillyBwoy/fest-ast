{
  function getComment (content) {
    return {
      type: 'comment',
      body: content
    };
  }

  function getCData (content) {
    return {
      type: 'cdata',
      body: content
    };
  }

  function getText (chars) {
    return {
      type: 'text',
      body: chars.join('').trim()
    };
  }

  function getNode (obj, attrs) {
    return {
      type: 'node',
      name: obj.name,
      params: '',
      attrs: attrs.reduce(function (prev, curr) {
        prev[curr[0]] = curr[1];
        return prev;
      }, {}),
      children: []
    };
  }
}

Start =
  Element

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

CHARS = ([^<\n\r]+)

STRING "string"
  = '"' string:[^"\n\r]* '"' { return string.join(""); }
  / "'" string:[^'\n\r]* "'" { return string.join(""); }


NameStartChar
  = [A-Z] / "_" / [a-z] / [\u00C0-\u00D6] / [\u00D8-\u00F6]
  / [\u00F8-\u02FF] / [\u0370-\u037D] / [\u037F-\u1FFF] / [\u200C-\u200D]
  / [\u2070-\u218F] / [\u2C00-\u2FEF] / [\u3001-\uD7FF] / [\uF900-\uFDCF] / [\uFDF0-\uFFFD]

NameChar
  = NameStartChar / "-" / "." / [0-9] / [\u00B7] / [\u0300-\u036F] / [\u203F-\u2040]

Identifier
  = first:NameStartChar last:NameChar* {
      return first + last.join("");
    }

Identity "qualified identifier"
	= prefix:Identifier ':' id:Identifier {
      return {
        name: prefix + ':' + id,
        prefix: prefix,
        id: id
      };
    }
	/ id:Identifier {
      return {
        name: id,
        id: id
      };
    }


Attribute
  = _ identity:Identity value:( _ '=' _ value:STRING { return value; } )? {
      return [identity.name, value];
    }

TagOpen
  = '<' identity:Identity attrs:Attribute* _ '>' {
    return getNode(identity, attrs);
  }

TagClose
  = '</' Identity '>'

TagSelf
  = '<' identity:Identity+ attrs:Attribute* _ '/>' {
    return getNode(identity, attrs);
  }

Element
  = _ tag:TagOpen _ contents:ElementContent* _ TagClose _ {
      // Fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu!!!!
      if (tag.name === 'fest:params') {
        tag.children = [];
        tag.params += contents.filter((item) => item.type === 'text').map((item) => item.body).join('');
      } else {
        tag.children = tag.children.concat(contents);
      }
      return tag;
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
  = _ chars:CHARS _ {
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
