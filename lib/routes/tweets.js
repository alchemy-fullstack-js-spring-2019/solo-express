
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
  .get('/', (req, res) =>{
    Tweet
      .find()
      .then(allTweets=>res.send(allTweets));
  })

  .get('/:id', (req, res) =>{

    const { id } = req.params;
    Tweet
      .findById(id)
      .then(tweet=>res.send(tweet));
  })

  .put('/:id', (req, res) =>{
   
    const { id } = req.params; //the input put('/id'<--- is what params will have,(req,res)
  
    const { handle, body } = req.body;
    Tweet 
      .findByIdAndUpdate(id, { handle, body })
      .then(updatedTweet=>res.send(updatedTweet));
  })

  .delete('/:id', (req, res) =>{
    const { id } = req.params;
    console.log('trying to delete', id);
    Tweet 
      .findByIdAndDelete(id)
      .then(deleteCount=>res.send(deleteCount));
  });

  
