const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const usersRoutes = require('./routes/users');

app.use(express.json());

app.use((req, res, next) => {
  console.log('request incoming!');
  next();
});

app.use('/tweets', tweetsRoutes);
app.use('/users', usersRoutes);

module.exports = app;
