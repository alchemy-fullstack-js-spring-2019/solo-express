const express = require('express');
const app = express();
const tweetRouter = require('./routes/tweets');
const tagRouter = require('./routes/tags');
const { parse } = require('url');

app.use((req, res, next) => {
  const url = parse(req.url, true);
  console.log('Request Incoming!');
  console.log(req.method, url.pathname);
  next();
});

app.use(express.json());

app.use('/tweets', tweetRouter);
app.use('/tags', tagRouter);

module.exports = app;


