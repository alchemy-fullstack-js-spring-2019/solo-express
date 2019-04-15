const { Router } = require('express');
const Tweet = require('../models/Tweets');

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
      .then(tweets => res.send(tweets));
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tweet 
      .findById(id)
      .then(tweet => res.send(tweet));
  });

