const { Router } = require('express');
const User = require('../models/Users');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
      sign
    } = req.body;

    User
      .create({ name, sign })
      .then(createdUser =>{
        res.send(createdUser);
      });
  });
