const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
      tweet
    } = req.body;

    Tweet
      .create({ name, tweet })
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
      .then(foundTweet => res.send(foundTweet));
  })

  .put('/:id', (req, res) => {
    const { id } = req.params;
    const {
      name,
      body
    } = req.body;

    Tweet
      .findByIdAndUpdate(id, { name, body })
      .then(updatedTweet => res.send(updatedTweet));
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params;
    
    Tweet
      .findByIdAndDelete(id)
      .then(result => res.send(result));
  });  
