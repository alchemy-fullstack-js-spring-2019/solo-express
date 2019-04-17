const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const usersRoutes = require('./routes/users');

app.use(express.json());


app.use('/tweets', tweetsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next, err) => {
  console.error(err.stack);
  res.status(500).send('error: Internal Server Error');
});

module.exports = app;
