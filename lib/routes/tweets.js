const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            handle,
            body
        } = req.body;

        Tweet
            .create({ handle, body })
            .then(createdTweet => {
                res.send(createdTweet);
            })
            .catch(err => {
                next(err);   //uses middleware to catch the error (refer to app.js)
            });
    })

    .get('/', (req, res) => {
        Tweet
            .find()
            .then(tweets => res.send(tweets));
    })

    .get('/:id', (req, res) => {
        Tweet
            .findById(req.params.id)
            .then(tweet => res.send(tweet));
    })

    .put('/:id', (req, res) => {
        // const { id } = req.params;  ryan's way
        const {
            handle,
            body
        } = req.body;

        Tweet
            .findByIdAndUpdate(req.params.id, { handle, body })
            .then(tweet => res.send(tweet));
    })

    .delete('/:id', (req, res) => {
        Tweet
            .findByIdAndDelete(req.params.id)
            .then(deleted => res.send(deleted));
    });


