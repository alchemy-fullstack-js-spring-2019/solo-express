const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const bugRoutes = require('./routes/bugs');

app.use((req, res, next) => {
  next();
});

app.use(express.json());

app.use('/tweets', tweetsRoutes);
app.use('/bugs', bugRoutes);

app.use(require('./middlewear/not-found'));

// eslint-disable-next-line 
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});


module.exports = app;
