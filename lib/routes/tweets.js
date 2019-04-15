const { Router } = require('express'); // or w/ .Router()
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      handle, 
      body
    } = req.body; // equals the body of the request

    Tweet
      .create({ handle, body })
      .then(createdTweet => {
        res.send(createdTweet); // IN JSON
      });
  })

  .get('/', (req, res) => { // = /tweets
    Tweet 
      .find()
      .then(tweets => res.send(tweets));
  })
  // params is part of express

  .get('/:id', (req, res) => { // = /tweets/:id
    const { id } = req.params;
    Tweet
      .findById(id)
      .then(tweet => res.send(tweet)); //tweet dinsgular
  })

  .put('/:id', (req, res) => { // PUT creates resource
    const { id } = req.params; // POST updates it
    const { 
      handle, // can do this here bse created in app.js
      body
    } = req.body;

    Tweet
      .findByIdAndUpdate(id, { handle, body })
      .then(updatedTweet => res.send(updatedTweet));
  })

  .delete('/:id', (req, res) => {
    const { id } = req.params;

    Tweet
      .findByIdAndDelete(id)
      .then(result => res.send(result));
  });

