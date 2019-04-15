const express = require('express');
const app = express();
const tweetsroutes = require('./routes/tweets');

//Express middleware
//Between an incoming request and outgoing response

//body parser
app.use(express.json());

//localhose:7890/tweets
// go to tweetsRoutes
app.use('./tweets', tweetsroutes);

module.exports = app;
