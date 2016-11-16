#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const xsd = require('libxml-xsd');

const template = process.argv.slice(2)[0];
const tpl = fs.readFileSync(template, 'utf8');

xsd.parseFile(path.resolve(__dirname, '../lib/schema/fest.xsd'), (err, schema) => {
  if (err) {
    throw err;
  }
  schema.validate(tpl, (err, validationErrors) => {
    console.log('err', err);
    console.log('errors', validationErrors);
  });
});
