const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets.js');

app.use(express.json());

app.use((req, res, next) => {
  const startAt = Date.now();

  res.on('finish', () => {
    const timeElapsed = Date.now() - startAt;
    console.log(`[${req.method}][${req.baseUrl}][${res.statusCode}] -${timeElapsed}ms`);
  });
  next();
});

app.use('/tweets', tweetsRoutes);

module.exports = app;
