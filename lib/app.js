const express = require('express');
const app = express();
const tweetRoutes = require('./routeHandler/handleTweetRoutes.js');


app.use(express.json());

app.use('/tweets', tweetRoutes); //tweetRoutes is middleware. You can pass multiple middleware functions here, let's say if you wanted to have multiple middleware function manipulate requests for just this /tweets path



module.exports = app;
