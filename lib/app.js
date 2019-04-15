const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');


//write our own middlware:
app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`[${req.method}] ${req.url}`);
    next(); //pushes us to next piece of middleware
});
// app.use means use this express middleware
//middleware runs in the order that we add it
app.use(express.json());
//if http://localhost:7890/tweets, use tweetsRoutes
app.use('/tweets', tweetsRoutes);

//this middleware will only run if the one above it doesn't respond
// can handle a bad request
// eslint-disable-next-line no-unused-vars
app.use(require('./middleware/not-found'));

module.exports = app;
