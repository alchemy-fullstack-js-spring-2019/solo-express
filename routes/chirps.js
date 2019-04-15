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
  });
