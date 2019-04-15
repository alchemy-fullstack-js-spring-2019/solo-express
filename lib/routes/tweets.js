const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      handle,
      body
    } = req.body;
    console.log(req.body);
    Tweet
      .create({ handle, body })
      .then(createdTweet => {
        console.log(createdTweet);
        res.send(createdTweet);
      });
  });
