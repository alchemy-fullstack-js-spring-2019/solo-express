const { Router } = require('express');
const Tag = require('../models/Tag');

/* 
tags  look like:
{ name: '#js', _id: '1234' }
*/

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
  })

  .get('/', (req, res) => {
    Tag
      .find()
      .then(tags => res.send(tags));
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tag
      .findById(id)
      .then(tag => res.send(tag));
  })
