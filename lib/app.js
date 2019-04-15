const express = require('express');
const app = express();
const tweetRouter = require('./routes/tweets');
const tagRouter = require('./routes/tags');

app.use((req, res, next) => {
  console.log('Request Incoming!');
  next();
});

app.use(express.json());

app.use('/tweets', tweetRouter);
app.use('/tags', tagRouter);

module.exports = app;


