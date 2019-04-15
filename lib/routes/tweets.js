const { Router } = require('express');
const Tweet = require('../models/Tweet');

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
  });
