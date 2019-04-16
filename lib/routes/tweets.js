const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      handle,
      body
    } = req.body;

    Tweet 
      .create({ handle, body })
      .then(createdTweet => {
        res.send(createdTweet);
      })
      .catch(err => {
        next(err);
      });
  })
/* eslint-disable-next-line no-unused-vars */
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets));
  })

/* eslint-disable-next-line no-unused-vars */
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(tweet => res.send(tweet));
  })

/* eslint-disable-next-line no-unused-vars */
  .put('/:id', (req, res, next) => {
    const { id } = req. params;
    const { 
      handle, 
      body 
    } = req.body;
  
    Tweet
      .findByIdAndUpdate(id, { handle, body })
      .then(updatedTweet => res.send(updatedTweet));
  })

/* eslint-disable-next-line no-unused-vars */
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .then(result => res.send(result));
  });
