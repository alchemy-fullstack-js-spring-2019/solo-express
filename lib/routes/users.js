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
  })
  .get('/', (req, res) => {
    User  
      .find()
      .then(users => res.send(users));
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    User
      .findById(id)
      .then(user => res.send(user));
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const {
      name,
      sign
    } = req.body;

    User
      .findByIdAndUpdate(id, { name, sign })
      .then(user => res.send(user));
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    User  
      .findByIdAndDelete(id)
      .then(result => res.send(result));
  });
