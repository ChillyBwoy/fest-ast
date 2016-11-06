## FiESTa: ast-parser + vdom for fest templates

#### Generate parser:

```
$ ./bin/generate-parser.js > lib/parser.js
```

#### Compile template to ast:

```
./bin/fiesta.js templates.xml | js-beautify --type=js -s=2 -n
```

#### Compile template to function:
```
./bin/fiesta.js templates.xml -f | js-beautify --type=js -s=2 -n
```


src -> ast -> [pipe: plugin-1 -> plugin-2 -> ... -> plugin-n]


Передавать в FEST вместо $token$({type, attrs, children}) конструкцию вида
(e, {type, attrs, children}) -> e({type, attrs, children});
