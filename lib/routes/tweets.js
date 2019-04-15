const { Router } = require('express');
const Tweet = require('../mpdel')

module.exports = Router()
    .post('/', (req, res) => {
        const {
            handle,
            body
        } = req.body;

        Tweet.create({ handle, body })
    });
