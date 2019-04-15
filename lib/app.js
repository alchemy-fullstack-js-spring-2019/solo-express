const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');
const trollRoutes = require('./routes/trolls');

//express middleware
//between a request coming in
//and a response going out

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`); //lists actions 
  next(); //move to next middleware
});

app.use(express.json()); //has next included

app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);
app.use('/trolls', trollRoutes);

//this will only run if 18-20 not run
app.use(require('./middleware/not-found'));


module.exports = app;


