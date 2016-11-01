#!/usr/bin/env node

const fs = require('fs');
const peg = require('pegjs');

const grammar = fs.readFileSync('./grammars/fest.pegjs', 'utf-8');
const parser = peg.generate(grammar, {
  output: 'source',
  cache: true,
  format: 'commonjs',
  optimize: 'speed',
  trace: true
});

process.stdout.write(`${parser}\n`);
