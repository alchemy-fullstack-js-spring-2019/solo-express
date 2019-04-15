const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
    .post('/', (request, response) => {
        const {
            handle,
            body
        } = request.body;

        Tweet
            .create({ handle, body })
            .then(newTweet => {
                response.send(newTweet);
            });
    });
