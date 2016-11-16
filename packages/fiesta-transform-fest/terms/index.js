const dataTerms = require('./data');
const exprTerms = require('./expr');
const commonTerms = require('./common');

module.exports = Object.assign({}, dataTerms, exprTerms, commonTerms);
