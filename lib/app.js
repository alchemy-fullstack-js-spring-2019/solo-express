const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

app.use((req, res, next) => {
    console.log('you are in middleware');
    console.log(`[${req.method}] ${req.url}`);  //creates a log of the actions happening
    next();  //pushes me on to the next piece of middleware. if you don't have next, it will do the console log but not actually move on (postman just shows "loading")
});

//Body parser (middleware - traffic controller)
app.use(express.json());  //anything that comes in, parse as json
app.use('/tweets', tweetsRoutes); //when we get incoming tweets, pass it along to the router
app.use('/tags', tagsRoutes);


module.exports = app;
