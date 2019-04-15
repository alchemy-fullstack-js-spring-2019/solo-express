const { Router } = require('express');
const Chirps = require('../models/Chirps');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      handle,
      body
    } = req.body;
    Chirps.create({ handle, body })
      .then(createdChirp => {
        res.send(createdChirp);
      });
  })

  .get('/', (req, res) => {
    Chirps.find()
      .then(foundChirps => {
        res.send(foundChirps);
      });
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    Chirps.findById(id)
      .then(foundChirp => {
        res.send(foundChirp);
      });
  })
;