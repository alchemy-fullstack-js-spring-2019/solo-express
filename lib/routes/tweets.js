const { Router } = require('express');
const Tweet = require('../models/Tweet.js');

module.exports = Router()
  .post('/', (req, res) => {
    const { 
      handle,
      text
    } = req.body;
    Tweet
      .create({ handle, text })
      .then(createdTweet => {
        res.send(createdTweet);
      });
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(foundTweet => {
        res.send(foundTweet);
      });
  })

  .get('/', (req, res) => {
    Tweet
      .find()
      .then(foundTweets => {
        res.send(foundTweets);
      });
  })

  .put('/:id', (req, res) => {
    const { id } = req.params;
    const {
      handle,
      text
    } = req.body;
    Tweet
      .findByIdAndUpdate(id, { handle, text })
      .then(updatedTweet => {
        res.send(updatedTweet);
      });
  });
