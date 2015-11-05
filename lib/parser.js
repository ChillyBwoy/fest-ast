'use strict';

const path = require('path');
const fs = require('fs');
const PEG = require('pegjs');


class Parser {
	constructor () {
		let grammarPath = path.resolve(`${__dirname}/grammars/fest.pegjs`);
		let grammar = fs.readFileSync(grammarPath, 'utf8');
		this._parser = PEG.buildParser(grammar);
	}

	parse (template) {
		return this._parser.parse(template);
	}
}

module.exports = {
	Parser: Parser
};
