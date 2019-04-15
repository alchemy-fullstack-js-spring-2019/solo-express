const { Router } = require('express');
const Tweet = require('../models/Tweet');

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
    });

// don't know how to export this 
module.exports = Router()
    .get('/', (req, res) => {
        Tweet
            .find()
            .then(tweets => res.send(tweets));
    });
