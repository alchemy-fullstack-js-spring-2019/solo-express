const express = require('express');
const app = express();
const tweetsroutes = require('./routes/tweets');

app.use('./tweets', tweetsroutes);

module.exports = app;
