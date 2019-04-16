const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const bugRoutes = require('./routes/bugs');

app.use((req, res, next) => {
  const initTime = new Date();
  res.on('finish', () => {
    const returnTime = new Date();
    console.log('    Response time: ', returnTime - initTime, 'ms');
    console.log('    Status Code', res.statusCode);
    console.log('    Request:', req.baseUrl, req.method);
  });
  next();
});

app.use(express.json());

app.use('/tweets', tweetsRoutes);
app.use('/bugs', bugRoutes);

app.use(require('./middlewear/not-found'));

// eslint-disable-next-line 
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});


module.exports = app;
