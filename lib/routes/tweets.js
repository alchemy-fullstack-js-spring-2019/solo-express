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
  });
