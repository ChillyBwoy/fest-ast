const crypto = require('crypto');

const TOKEN = crypto.randomBytes(4).toString('hex');

module.exports = TOKEN;
