const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

//** MIDDLEWARE IS A FUNCTION.  */
//Either needs to respond or call next() to go onto the next piece of middleware

app.use((req, res, next) => {
    // console.log('you are in middleware'); //middleware runs between the request coming in and the response going out
    // console.log(`[${req.method}] ${req.url}`);
    const start = Date.now();
    res.on('finish', function() {
        var ms = Date.now() - start;
        console.log(`[${req.method}] ${req.url} ${res.statusCode} ${ms}ms`);
    }); //creates a log of the actions happening
    next();  //pushes me on to the next piece of middleware. if you don't have next, it will do the console log but not actually move on (postman just shows "loading")
    //next('NOPE'); passing anything into "next" skips everything and goes to the last piece of middleware
    //next needs to be called if you're not going to respond 
});

//Body parser (middleware - traffic controller)
app.use(express.json());  //anything that comes in, parse as json
app.use('/tweets', tweetsRoutes); //when we get incoming tweets, pass it along to the router
app.use('/tags', tagsRoutes); 
//can put more middleware here (ex: having auth)// app.use('/tweets', middlewareforAuth, tweetsRoutes); 


//eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {  //this will only run if line 15 doesn't respond -- middleware runs in order! For example, this will only show up if you input a route that doesn't exist  
    console.log('never!!!!');
    res.status(404).send({ error: 'Not Found' });
    //don't need next because we're responding  (eslint disabled because next isn't being used)
});
//this can be extracted to lib/middleware/not-found.js and then just use app.use(require('./middleware/not-found));

//error handling always has to be last piece of middleware, has to have 4 parameters. Only error handling middleware has err listed first, but it must have it listed first
//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send({ error: err });
}); 

module.exports = app;

//**can also put middleware in routes after path before (req, res) */
