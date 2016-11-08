//
// xml2json.pegjs
//

//
// # XML to JSON
//
// This grammar for XML parses a XML string and
// outputs a corresponding JSON data structure.
//


//
// ## JSON conventions for XML content
//
// * each XML element is a dictionary entry containing an array with attributes, elements, text values and comments
// * element names are directly taken over including the full namespace
// * namespaces are prefixing the name of an element or attribute and are URL-encoded enclosed by two underlines
// * each XML attribute is a dictionary entry conating an array of values
// * attribute names are prefixed using a "@" and includes the full nampespace
// * the text value entries have the special name "#text"
// * the cdata value entries have the special name "#cdata"
// * comment entries have the special name "#comment"
//

/////////////////////////////////////////////////////
//
// ## This section defines the utilities functions
//

//
// utility function to check defined namespaces supporting a stack of defined namespaces
//
{
  function removeEmpty(l) {
    var x, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = l.length; _i < _len; _i++) {
      x = l[_i];
      if (x) {
        _results.push(x);
      }
    }
    return _results;
  };

  function flat(xs) {
    return Array.prototype.concat.apply([], xs);
  }

  function escapeContent(s) {
    return s.split('\n').join('\\n');
  }

  function createNode(type, attrs = {}, children = []) {
    return {
      type, attrs, children
    };
  }

  function mergeNodes(nodes, merged = []) {
    if (nodes.length === 0) {
      return merged;
    }
    const [head, ...tail] = nodes;
    const last = merged.slice(-1)[0];

    let nextNodes = [];
    if ((typeof head !== 'undefined' && typeof last !== 'undefined') &&
        (last.type === head.type) && head.type === '#text') {
      let nextNode = createNode(last.type, {}, `${last.children}${head.children}`);
      nextNodes = merged.slice(0, -1).concat(nextNode);
    } else {
      nextNodes = merged.concat(head);
    }

    return mergeNodes(tail, nextNodes);
  }

  function reduceAttrs(attrs) {
    return attrs.reduce((acc, x) => {
      acc[x[0]] = x[1];
      return acc;
    }, {});
  }
}

////////////////////////////////////////////////////
//

Start
  = content:(Prolog comments:( _ c:Comment { return c } / _ PI { return null } )* e:( _ e:Element { return e } )? { return (e ? removeEmpty(comments).concat([e]) : removeEmpty(comments)) })? comments:Comment* _
    {
      const tree = content ? content.concat(comments) : comments;
      return Array.isArray(tree) ? tree[0] : tree;
    }

////////////////////////////////////////////////////
//
// ## This section defines white spaces
//

// The white spaces must be parsed explicite. The White spaces include
// the space and tab character as well as new line CR and LF characters.
// The white spaces mainly separate keywords, identifiers and numbers.
// The white spaces subsumes also new line character and followup empty
// lines.
//
WSEOL
  = WS
  / EOL

WS
  = [\t\v\f \u00A0\uFEFF]
  / [\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]

__ "white space character"
  = WSEOL+

_ "white space character"
  = WSEOL*

EOL
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028" // line separator
  / "\u2029" // paragraph separator

// A string must be pairwise surrounded by quote characters. A string
// could contain any characters except the surrounding character. A string
// must be written within a line.
//
STRING "string"
  = '"' string:[^"\n\r]* '"' { return string.join(""); }
  / "'" string:[^'\n\r]* "'" { return string.join(""); }

////////////////////////////////////////////////////
//
// ## This section defines the valid identifier names
//
NameStartChar
  = [A-Z] / "_" / [a-z] / [\u00C0-\u00D6] / [\u00D8-\u00F6]
  / [\u00F8-\u02FF] / [\u0370-\u037D] / [\u037F-\u1FFF] / [\u200C-\u200D]
  / [\u2070-\u218F] / [\u2C00-\u2FEF] / [\u3001-\uD7FF] / [\uF900-\uFDCF] / [\uFDF0-\uFFFD]

NameChar
  = NameStartChar / "-" / "." / [0-9] / [\u00B7] / [\u0300-\u036F] / [\u203F-\u2040]

Identifier
  = first:NameStartChar last:NameChar*
    { return first + last.join("") }

QualifiedIdentifier "qualified identifier"
  = prefix:Identifier ':' id:Identifier { return `${prefix}:${id}` }
  / id:Identifier { return id }

////////////////////////////////////////////////////
//
// ## This section defines the valid tags
//
StartTag
  = '<' type:QualifiedIdentifier
    & { return true }
    attrs:Attribute* _ '>'
    & { return true }
    {
      return createNode(type, reduceAttrs(attrs));
    }

EndTag
  = '</' QualifiedIdentifier _ '>'
    & { return true }

ClosedTag
  = '<' type:QualifiedIdentifier
    & { return true }
    attrs:Attribute* _ '/>'
    & { return true }
    {
      return createNode(type, reduceAttrs(attrs));
    }

////////////////////////////////////////////////////
//
// ## This section defines an element
//
Element
  = _ tag:StartTag
    _ contents:( content:ElementContent _ { return content })*
    _ EndTag
    {
      tag.children = flat(tag.children.concat(contents));
      tag.children = mergeNodes(tag.children);
      return tag;
    }
  / _ tag:ClosedTag { return tag }

ElementContent
  = Cdata
  / Comment
  / Element
  / ElementValue

ElementValue
  = chars:([^<\n\r]+)
  {
    return createNode('#text', {}, escapeContent(chars.join('').trim()));
  }

////////////////////////////////////////////////////
//
// ## This section defines an attribute
//
AttributeContent
  = _ '=' _ value:STRING {
      return value;
    }

Attribute
  = _ identity:QualifiedIdentifier value:AttributeContent? {
      return [identity, value];
    }

////////////////////////////////////////////////////
//
// ## This section defines special tags
//

//
// Processing Instruction
//
PI
  = '<?' Identifier __ PIContent

PIContent
  = '?>'
  / __ PIContent
  / . PIContent

//
// The prolog of the xml file
//
Prolog
  = '<?xml'i
    _ XmlVersion _
    ( Encoding _ )?
    ( Standalone _ )?
    '?>'

XmlVersion
  = 'version'i _ '=' _ STRING

Encoding
  = 'encoding'i _ '=' _ STRING

Standalone
  = 'standalone'i _ '=' _ STRING

//
// CDATA section
//
Cdata "CDATA"
  = '<![CDATA[' children:CdataContent
    {
      return createNode('#cdata', {}, escapeContent(children));
    }

CdataContent
  = ']]>'
  / head:. tail:CdataContent { return head + tail }

//
// XML comments
//
Comment "comment"
  = '<!--' children:CommentContent
    {
      return createNode('#comment', {}, escapeContent(children));
    }

CommentContent
  = '-->' { return '' }
  / head:. tail:CommentContent { return head + tail }
