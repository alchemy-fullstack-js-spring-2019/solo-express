
const { Router } = require('express');
const Tweet = require('../models/Tweets');

module.exports = 
Router()
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
  .get('/', (req,res) =>{
    Tweet
      .get()
      .then(allTweets=>res.send(allTweets))
  })

  .get('/:id', (req,res) =>{
    console.log(req.params);
    const { id } = req.params;
    Tweet
    .findById(id)
    .then(tweet=>res.send(tweet));
  })

  .put('/id', (req,res) =>{
    const { id } = req.params; //the input put('/id'<--- is what params will have,(req,res) 
    const { handle, body } = req.body;
    Tweet 
    .findByIdAndUpdate(id, { handle,body })
    .then(updatedTweet=>res.send(updatedTweet));
  })

  .delete('/id', (req,res) =>{
    const { id } = req.params;
    Tweet 
    .findByIdAndUpdate(id)
    .then(deleteCount=>res.send(deleteCount));
  })

  