const express = require('express');
const tweetsRoutes = require('./routes/tweets');
const app = express();

app.use(express.json());

app.use('/tweets', tweetsRoutes);

module.exports = app;
