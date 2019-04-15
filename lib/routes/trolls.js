const { Router } = require('express');
const Troll = require('../models/Troll');

module.exports = Router()
  .post('/', (req, res) => {
    Troll.create({
      handle: req.body.handle,
      date: new Date(),
    })
      .then(troll => res.send(troll));
  })

  .get('/', (req, res) => {
    Troll.find()
      .then(trollList => res.send(trollList));
  })

  .get('/:id', (req, res) => {
    Troll.findById(req.params.id)
      .then(singleTroll => res.send(singleTroll));
  })

  .put('/:id', (req, res) => {
    Troll.findByIdAndUpdate(req.params.id, { handle: req.body.handle })
      .then(troll => res.send(troll));
  })

  .delete('/:id', (req, res) => {
    Troll.findByIdAndDelete(req.params.id)
      .then(result => res.send(result));
  });






