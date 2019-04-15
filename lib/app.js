const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

// Express Middleware
// Between an incoming request and outgoing response

// Body Parse
app.use(express.json());

app.use('/tweets', tweetsRoutes);

module.exports = app;
