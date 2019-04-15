const router = require('express').Router();
const Tweet = require('../models/Tweet');

//need to add next to move through each route?
router.post('/tweets', (req, res) => {
  Tweet.create({ 
    handle: req.body.handle,
    text: req.body.text,
  })
    .then(tweet => res.send(tweet));
});

router.get('/tweets/:id', (req, res) => {
  if(req.params.id === '0') {
    Tweet.find()
      .then(tweet => res.send(tweet));
  } else {
    Tweet.findById(req.id)
      .then(tweet => res.send(tweet));
  }
});

router.put('/tweets', (req, res) => {
  Tweet.findByIdAndUpdate(req.id, { name: req.body.name })
    .then(tweet => res.send(tweet));
});

router.delete('/tweets', (req, res) => {
  Tweet.findByIdAndDelete(req.id)
    .then(result => res.send(result));
});



