const express = require('express');
const app = express();
const tweetRoutes = require('./routeHandler/handleTweetRoutes.js');


app.use(express.json());

app.use('/tweets', tweetRoutes);


module.exports = app;
