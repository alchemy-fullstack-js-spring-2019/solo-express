const getQuote = require('../services/futuramaApi');

module.exports = (req, res, next) => {
    return getQuote()
        .then(quoteObj => {
            req.quote = quoteObj.quote;
            req.handle = quoteObj.character;
            next();
        });
};
