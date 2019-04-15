const { Router } = require('express');
const Tweet = require('../models/Tweet.js');

module.exports = Router()
  .post('/', (req, res) => {
    const tweet = { 
      handle: req.body.handle,
      text: req.body.text
    };
    Tweet
      .create(tweet)
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
  });
