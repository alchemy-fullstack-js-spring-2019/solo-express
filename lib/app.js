const express = require('express');
const app = express();
const tweetRoutes = require('./routes/tweets');

app.use(express.json());
app.use('/tweets', tweetRoutes);

module.exports = app;
