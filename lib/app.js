const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(express.json());

app.use(require('./middleware/logger'));

app.use('/tweets', tweetsRoutes);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: 'Internal Server Error' });
});

module.exports = app;
