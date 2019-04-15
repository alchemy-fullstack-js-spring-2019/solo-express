const { Router } = require('express');
const Tweet = require('../models/Tweet');

//create a tweet
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
    });

// don't know how to export this 
//get all tweets
Router()
    .get('/', (req, res) => {
        Tweet
            .find()
            .then(tweets => res.send(tweets));
    });


//get a tweet