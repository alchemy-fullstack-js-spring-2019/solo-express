const express = require('express');

const app = express();


app.get('/hello', (req, res) => {
  res.end('yo');
});
  


module.exports = app;
