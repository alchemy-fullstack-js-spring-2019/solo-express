const { Router } = require('express');
const TweetStore = require('../../models/Tweet.js');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      twitterHandle,
      tweet
    } = req.body; //destructuring the body

    TweetStore 
      .create({ twitterHandle, tweet }) //.create returns a promise that we can therefore .then off of
      .then(createdTweet => {
        res.send(createdTweet);
      });
  })
  //get a list of all tweets using the store's .find()
  .get('/', (req, res) => {
    TweetStore.find()
      .then(allTweets => res.send(allTweets));
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    TweetStore.findById(id)
      .then(tweet => res.send(tweet));
  });



