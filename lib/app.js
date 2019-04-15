    
const express = require('express');
const app = express();
const notFound = require('./middleware/notfound');
const tweetsRoutes = require('./routes/tweets');

app.use((req, res, next)=>{
  console.log('method', req.method);
  console.log('pathname', req.url);
  res.on('finish', ()=>{
    console.log('statusCode', res.statusCode);
  });
  next();
});

// Body Parser
app.use(express.json());

// if http://localhost:7890/tweets
// go to tweetsRoutes
app.use('/tweets', tweetsRoutes);


//eslint-disable-next-line no-unused-vars

// to import middleware app.use(require('path of middleware'))
//eslint-disable-next-line no-unused-vars
app.use((req, res, next)=>{
  res.status(404).send({ error:'not found' });
});

//error handling middleware needs to be last
app.use(notFound);

module.exports = app;
