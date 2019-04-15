const { Router } = require('express');
const Growls = require('../models/Growls');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle, 
      body
    } = req.body;
    Growls.create({ handle, body })
      .then(createdGrowl => {
        res.send(createdGrowl);
      });
  })

  .get('/', (req, res, next) => {
    Growls.find()
      .then(listOfGrowls => {
        res.send(listOfGrowls);
      });
  })
