const getQuote = require('../futuramaApi');

module.exports = (req, res, next) => {
  return getQuote()
    .then(([quoteObj]) => {
      req.quote = quoteObj.quote;
      next();
    });
};
