const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      handle,
      body
    } = req.body;

    Tweet
      .create({ handle, body })
      .then(createdTweet => {
        res.send(createdTweet);
      });      
  })
  .get('/', (req, res) => {
    Tweet
      .find()
      .then(allTweets => {
        res.send(allTweets);
      });
  })
  .get('/:id', (req, res) => {
    Tweet
      .findById(req.params.id)
      .then(foundTweet => {
        res.send(foundTweet);
      });
  });
