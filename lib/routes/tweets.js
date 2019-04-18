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
    })
    .get('/', (request, response) => {
        Tweet 
            .find()
            .then(tweets => {
                response.send(tweets);
            });
    })
    .get('/:id', (request, response) => {
        const { id } = request.params;
        Tweet
            .findById(id)
            .then(tweet => {
                response.send(tweet);
            });
    })
    .put('/:id', (request, response) => {
        const { id } = request.params;
        const {
            handle,
            body
        } = request.body;

        Tweet
            .findByIdAndUpdate(id, { handle, body })
            .then(updatedTweet => {
                console.log(updatedTweet);
                response.send(updatedTweet);
            });
    })
    .delete('/:id', (request, response) => {
        const { id } = request.params;
        Tweet
            .findByIdAndDelete(id)
            .then(result => response.send(result));
    });
