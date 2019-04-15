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
      .findByIdandUpdate(id, { handle, body })
      .then(updatedTweet => res.send(updatedTweet));
  })
  .delete('/:id', (req, res) => {
    const { id } = res.params;

    Tweet
      .findByIdandDelete(id)
      .then(result => res.send(result));
  });



