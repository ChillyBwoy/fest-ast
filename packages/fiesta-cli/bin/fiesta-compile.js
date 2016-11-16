#!/usr/bin/env node

const compile = require('../index');

const [template, ...args] = process.argv.slice(2);
process.stdout.write(compile(template, args));
