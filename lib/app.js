const express = require('express');
const app = express();
const createdTweet = require('../lib/routes/tweets');
const animalCreator = require('../lib/routes/animals');

app.use(express.json());
app.use('/tweets', createdTweet);
app.use('/animals', animalCreator);

module.exports = app;
