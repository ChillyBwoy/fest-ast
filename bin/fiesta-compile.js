#!/usr/bin/env node

const compile = require('../packages/fiesta-cli');

const [template, ...args] = process.argv.slice(2);
process.stdout.write(compile(template, args));
