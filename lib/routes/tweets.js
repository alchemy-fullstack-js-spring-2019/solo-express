const { Router } = require('express');
const Tweet = require('../models/Tweet');

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

    .get('/:id', (req, res) => {
        if(req.params.id) {
            Tweet
                .findById(req.params.id)
                .then(tweet => res.send(tweet));
        } else {
            Tweet
                .find()
                .then(tweets => res.send(tweets));
        }
    });

    //ryan's:
    // .get('/:id', (req, res) => {
    //     const { id } = req.params;
    //     Tweet
    //         .findById(id)
    //         .then(tweet => res.send(tweet));
    // })



