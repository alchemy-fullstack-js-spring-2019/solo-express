const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    Tweet.create({ 
      handle: req.body.handle,
      text: req.body.text,
    })
      .then(tweet => res.send(tweet));
  })

  .get('/', (req, res) => {
    Tweet.find()
      .then(tweetsList => res.send(tweetsList));
  })

  .get('/:id', (req, res) => {
    Tweet.findById(req.id)
      .then(listofTweets => res.send(listofTweets));
  })

  .put('/', (req, res) => {
    Tweet.findByIdAndUpdate(req.id, { name: req.body.name })
      .then(tweet => res.send(tweet));
  })

  .delete('/', (req, res) => {
    Tweet.findByIdAndDelete(req.id)
      .then(result => res.send(result));
  });
  

//need to add next to move through each route?
// router.post('/tweets', (req, res) => {
//   Tweet.create({ 
//     handle: req.body.handle,
//     text: req.body.text,
//   })
//     .then(tweet => res.send(tweet));
// });

// Router.get('/:id', (req, res) => {
//   if(req.params.id === '0') {
//     Tweet.find()
//       .then(tweet => res.send(tweet));
//   } else {
//     Tweet.findById(req.id)
//       .then(tweet => res.send(tweet));
//   }
// });

// Router.put('/', (req, res) => {
//   Tweet.findByIdAndUpdate(req.id, { name: req.body.name })
//     .then(tweet => res.send(tweet));
// });

// Router.delete('/', (req, res) => {
//   Tweet.findByIdAndDelete(req.id)
//     .then(result => res.send(result));
// });



