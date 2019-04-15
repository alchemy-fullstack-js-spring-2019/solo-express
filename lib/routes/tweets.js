const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    Tweet.create({ 
      handle: req.body.handle,
      text: req.body.text || req.quote
    })
      .then(tweet => res.send(tweet));
  })

  .get('/', (req, res) => {
    Tweet.find()
      .then(tweetsList => res.send(tweetsList));
  })

  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
      .then(tweet => res.send(tweet));
  })

  .put('/:id', (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, { handle: req.body.handle })
      .then(tweet => res.send(tweet));
  })

  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id)
      .then(result => res.send(result));
  });
  

