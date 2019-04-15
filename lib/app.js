const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use(express.bodyParser());
app.use('/tweets', tweetsRoutes);

module.exports = app;


