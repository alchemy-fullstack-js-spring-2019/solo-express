const { Router } = require('express');
const Tweet = require('../models/Tweet');
const futuramaQuote = require('../middleware/futurama-quote');

module.exports = Router()
  .post('/', futuramaQuote, (req, res) => {
    const {
      handle,
      text,
    } = req.body;

    Tweet.create({ handle, text: text || req.quote })
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
  

