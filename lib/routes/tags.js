const { Router } = require('express');
const Tag = require('../models/Tag.js');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name
    } = req.body;
    Tag
      .create({ name })
      .then(createdTag => {
        res.send(createdTag);
      });
  });
