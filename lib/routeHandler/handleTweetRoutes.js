const { Router } = require('express');
const TweetStore = require('../../models/Tweet.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      twitterHandle,
      tweet
    } = req.body; //destructuring the body

    TweetStore 
      .create({ twitterHandle, tweet }) //.create returns a promise that we can therefore .then off of
      .then(createdTweet => {
        res.send(createdTweet);
      })
      .catch(err => {
        next(err);
      });
  })
  //get a list of all tweets using the store's .find()
  .get('/', (req, res, next) => {
    TweetStore.find()
      .then(allTweets => res.send(allTweets))
      .catch(err => {
        next(err);
      });
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    TweetStore.findById(id)
      .then(tweet => res.send(tweet))
      .catch(err => {
        next(err);
      });
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      twitterHandle,
      tweet
    } = req.body;

    TweetStore
      .findByIdAndUpdate(id, { twitterHandle, tweet })
      .then(updatedTweet => res.send(updatedTweet))
      .catch(err => {
        next(err);
      });

  });

