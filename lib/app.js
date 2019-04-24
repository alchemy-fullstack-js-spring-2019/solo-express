const express = require('express');
const app = express();
const tweetRoutes = require('./routeHandler/handleTweetRoutes.js');


app.use(express.json());

app.use('/tweets', tweetRoutes); //tweetRoutes is middleware. You can pass multiple middleware functions here, let's say if you wanted to have multiple middleware function manipulate requests for just this /tweets path

app.use(require('./middleware/404.js'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});
//WHY DO WE DO THIS MIDDLEWARE HERE, AND WHY IS IT DIFFERENT THAN THE ONES WE BUILD IN MIDDLEWARE FOLDER !?

module.exports = app;
