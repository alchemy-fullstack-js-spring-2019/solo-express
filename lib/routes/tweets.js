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
  });
