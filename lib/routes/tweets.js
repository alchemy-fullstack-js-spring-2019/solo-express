const { Router } = require('express');
const Tweet = require('../models/Tweet');


module.exports = Router()
//POST /tweets
    .post('/', (req, res) => {
        const {
            handle, 
            body
        } = req.body;
        Tweet
        .create({ handle, body })
        .then(newTweet => {
            res.send(newTweet);
        });
    })


//GET /tweets
    .get('/', (req, res) => {
        Tweet
        .find()
        .then(tweets => {
            res.send(tweets);
        });
    })

//GET /tweets/:id
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tweet
        .findById(id)
        .then(tweet => {
            res.send(tweet);
        });

    })


//PUT /tweets/:id
.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        handle,
        body
    } = req.body;
    Tweet
    .findByIdAndUpdate(id)
    .then(updatedTweet => {
        res.send(updatedTweet);
    });
})

//DELETE /tweets/:id
.delete('/:id', (req, res) => {
    const { id } = req.params;
    Tweet
    .findByIdAndDelete(id)
    .then(result => res.send(result));
});