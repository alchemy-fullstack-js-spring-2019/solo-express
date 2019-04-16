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
      .catch(next);    
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(allTweets => {
        res.send(allTweets);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .then(foundTweet => {
        res.send(foundTweet);
      })
      .catch(next);

  })
  .put('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body)
      .then(updatedTweet => {
        res.send(updatedTweet);
      })
      .catch(next);

  })
  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(deleteObj => {
        res.send(deleteObj);
      })
      .catch(next);
  });
