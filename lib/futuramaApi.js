const request = require('superagent');

function getQuote() {
  return request
    .get('url')
    .then(res => res.body);
}

module.exports = getQuote;
