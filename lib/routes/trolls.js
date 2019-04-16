const { Router } = require('express');
const Troll = require('../models/Troll');

module.exports = Router()
  .post('/', (req, res, next) => {
    Troll.create({
      handle: req.body.handle,
      date: new Date(),
    })
      .then(troll => res.send(troll))
      .catch(err => next(err));
  })

  .get('/', (req, res, next) => {
    Troll.find()
      .then(trollList => res.send(trollList))
      .catch(err => next(err));
  })

  .get('/:id', (req, res, next) => {
    Troll.findById(req.params.id)
      .then(singleTroll => res.send(singleTroll))
      .catch(err => next(err));
  })

  .put('/:id', (req, res, next) => {
    Troll.findByIdAndUpdate(req.params.id, { handle: req.body.handle })
      .then(troll => res.send(troll))
      .catch(err => next(err));
  })

  .delete('/:id', (req, res, next) => {
    Troll.findByIdAndDelete(req.params.id)
      .then(result => res.send(result))
      .catch(err => next(err));
  });







