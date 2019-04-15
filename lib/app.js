const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

//Body parser (middleware - traffic controller)
app.use(express.json());  //anything that comes in, parse as json
app.use('/tweets', tweetsRoutes); //when we get incoming tweets, pass it along to the router

module.exports = app;
