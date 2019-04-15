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
  })

  .get('/', (req, res) => {
    Tag
      .find()
      .then(foundTags => {
        res.send(foundTags);
      });
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tag
      .findById(id)
      .then(foundTag => {
        res.send(foundTag);
      });
  })

  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Tag 
      .findByIdAndUpdate(id, { name })
      .then(updatedTag => {
        res.send(updatedTag);
      });
  });
