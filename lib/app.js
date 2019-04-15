const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use((req, res, next) => {
  console.log('i am middleware');
  next();
});

app.use(express.json());

app.use('/tweets', tweetsRoutes);

// app.use(require('./middleware/not-found'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) =>{
  res.status(500).send({ error: err });
});

module.exports = app;
 
