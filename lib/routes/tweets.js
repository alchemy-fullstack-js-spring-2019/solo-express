const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      handle,
      twit
    } = req.body;

    Tweet
      .create({ handle, twit })
      .then(newTweet => {
        res.send(newTweet);
      });
  })
  .get('/', (req, res) => {
    Tweet
      .find()
      .then(tweet => res.send(tweet));
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(tweet => res.send(tweet));
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const {
      handle,
      twit
    } = req.body;
    Tweet
      .findByIdAndUpdate(id, { handle, twit })
      .then(updatedTweet => res.send(updatedTweet));
  });
