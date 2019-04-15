const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res) => {
    Tag.create({
      name: req.body.name  
    })
      .then(tag => res.send(tag));
  })

  .get('/', (req, res) => {
    Tag.find()
      .then(tagList => res.send(tagList));
  })

  .get('/:id', (req, res) => {
    Tag.findById(req.params.id)
      .then(singleTag => res.send(singleTag));
  })

  .put('/:id', (req, res) => {
    Tag.findByIdAndUpdate(req.params.id, { name: req.body.name })
      .then(tag => res.send(tag));
  })

  .delete('/:id', (req, res) => {
    Tag.findByIdAndDelete(req.params.id)
      .then(result => res.send(result));
  });
