const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

//Express Middlesare between an incoming request
//and an outgoing response
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log('hi');
  next();
});

//body parser
app.use(express.json());

//if http://localhost:7890/tweets
//go to tweetsRoutes
app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);


/* eslint-disable-next-line no-unused-vars */
app.use(require('./middleware/not-found'));

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
