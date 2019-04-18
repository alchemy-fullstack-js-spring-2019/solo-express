const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
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

  .put('/:id', (req, res) => {
    const { id } = req.params;
    const {
      name
    } = req.body;

    Tag
      .findByIdAndUpdate(id, { name })
      .then(updatedTag => res.send(updatedTag));
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Tag
      .findByIdAndDelete(id)
      .then(result => res.send(result));
  });
