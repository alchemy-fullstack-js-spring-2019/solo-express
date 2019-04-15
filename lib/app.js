const express = require('express');
const app = express();
const tweetsroutes = require('./routes/tweets');

app.use(express.json());

app.use('/tweets', tweetsroutes);

module.exports = app;
