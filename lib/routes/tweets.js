const { Router } = require('express').Router();

module.exports = Router()
  .post('/', (req, res) => {
    Tweet.create({ 
      handle: req.body.handle,
      text: req.body.text,
    })
      .then(tweet => res.send(tweet));
  });
  
const Tweet = require('../models/Tweet');

//need to add next to move through each route?
// router.post('/tweets', (req, res) => {
//   Tweet.create({ 
//     handle: req.body.handle,
//     text: req.body.text,
//   })
//     .then(tweet => res.send(tweet));
// });

router.get('/:id', (req, res) => {
  if(req.params.id === '0') {
    Tweet.find()
      .then(tweet => res.send(tweet));
  } else {
    Tweet.findById(req.id)
      .then(tweet => res.send(tweet));
  }
});

router.put('/', (req, res) => {
  Tweet.findByIdAndUpdate(req.id, { name: req.body.name })
    .then(tweet => res.send(tweet));
});

router.delete('/', (req, res) => {
  Tweet.findByIdAndDelete(req.id)
    .then(result => res.send(result));
});



