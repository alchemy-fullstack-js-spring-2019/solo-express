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
        console.log(createdTweet);
        res.send(createdTweet);
      });  
  })

  .get('/', (req, res) => {
    Tweet
      .find()
      .then(foundTweets => {
        res.send(foundTweets);
      });
  })

  .get('/:id', (req, res) => {
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(tweet => res.send(tweet));
  })
  
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const {
      handle,
      body
    } = req.body;
    Tweet
      .findByIdAndUpdate(id,  { handle, body })
      .then(tweet => res.send(tweet));
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params;
    Tweet
      .findByIdAndDelete(id)
      .then(msg => res.send(msg));
  });
