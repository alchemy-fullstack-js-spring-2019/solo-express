const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    res.end('sup with it');
  });
