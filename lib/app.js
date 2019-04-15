const express = require('express');
const app = express();
const createdTweet = require('../lib/routes/tweets');

app.use(express.json());
app.use('/tweets', createdTweet);

module.exports = app;
