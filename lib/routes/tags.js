const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name
    } = req.body;

    Tag
      .create({ name })
      .then(tags => res.send(tags))
      .catch(err => {
        next(err);
      });
  })
  .get('/', (req, res, next) => {
    Tag
      .find()
      .then(tags => res.send(tags))
      .catch(err => {
        next(err);
      }); 
  }) 
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tag
      .findById(id)
      .then(tag => res.send(tag));
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    Tag
      .findByIdAndUpdate(id, { name: name })
      .then(updated => res.send(updated));
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Tag
      .findByIdDelete(id)
      .then(deleted => res.send(deleted));
  });
