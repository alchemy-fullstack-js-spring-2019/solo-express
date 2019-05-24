const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(express.json());
app.use(require('./middleware/notFound'));

app.use('/tweets', tweetsRoutes);

module.exports = app;
