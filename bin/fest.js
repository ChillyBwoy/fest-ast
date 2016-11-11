#!/usr/bin/env node

const fs = require('fs');

const fest = require('fest');

const template = process.argv.slice(2)[0];

process.stdout.write(fest.compile(template, {
  beautify: true,
  vdom: false
}));
