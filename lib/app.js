const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

// Express Middleware
// Between an incoming request and outgoing response
app.use(require('./middleware/logger'));
// Body Parse
app.use(express.json());

app.use('/tweets', tweetsRoutes);

app.use(require('./middleware/not-found'));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
  next();
});

module.exports = app;
