const { Router } = require('express');
const TweetStore = require('../../models/Tweet.js');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      twitterHandle,
      tweet
    } = req.body; //destructuring the body

    TweetStore
      .create({ twitterHandle, tweet })
      .then(createdTweet => {
        res.send(createdTweet);
      });
  });
